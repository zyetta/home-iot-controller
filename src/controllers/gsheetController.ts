// eslint-disable-next-line import/order
import { SPREADSHEET_RANGES, SPREADSHEET_SCOPES, TOKEN_PATH } from '../utils/constants';

import { DiscordHandler } from '../handlers/discordHandler';
import { ColorsEnum } from '../types/enums/generalEnums';
// eslint-disable-next-line import/order
import fs from 'fs';
import { getHumidityModel } from '../models/humidityModel';
import { getSwitchModel } from '../models/switchModel';
import { getTemperatureModel } from '../models/temperatureModel';
// eslint-disable-next-line import/order
import { google } from 'googleapis';
import { LogsHandler } from '../handlers/logsHandler';
import { LogTypeEnum } from '../types/enums/logsEnums';
// eslint-disable-next-line import/order
import readline from 'readline';
import { getStatusModel } from '../models/statusModel';

// eslint-disable-next-line import/order

export class GsheetController {
    /**
     * Credentials  of gsheet controller
     */
    private credentials;

    /**
     * Auth client of gsheet controller
     */
    private authClient;

    /**
     * Constructor for gsheet controller
     */
    constructor() {
        console.log(ColorsEnum.BG_CYAN, 'Uploading to Google Sheet 🚀');
        this.setCredentials();
        this.authenticate(this.getCredentials());
    }

    /**
     *  Authenticates user
     * @param {OAuth2ClientOptions} creds
     */
    private async authenticate(creds): Promise<void> {
        this.authClient = new google.auth.OAuth2(creds);
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return this.generateToken();
            this.authClient.setCredentials(JSON.parse(token.toString()));
            return null;
        });
        this.uploadData();
    }

    /**
     * Generates a new token file
     */
    private generateToken(): void {
        const authUrl = this.authClient.generateAuthUrl({ access_type: 'offline', scope: SPREADSHEET_SCOPES });
        console.log(ColorsEnum.BG_GREEN, 'Auth Url:', authUrl, ColorsEnum.RESET);
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question('Enter the code from that page here: ', code => {
            rl.close();
            this.authClient.getToken(code, (err, token) => {
                if (err) return console.error('Error while trying to retrieve access token', err);
                this.authClient.setCredentials(token);
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
                    if (error) return console.error(error);
                    console.log(ColorsEnum.FG_MAGENTA, 'Token stored to', TOKEN_PATH);
                    this.authenticate(this.getCredentials());
                    return null;
                });
                return null;
            });
        });
    }

    /**
     * Sets credentials from file
     */
    private setCredentials(): void {
        this.credentials = JSON.parse(process.env.GOOGLE_TOKEN as string);
    }

    /**
     * Gets credentials from file
     * @returns OAuth2ClientOptions
     */
    private getCredentials() {
        const creds = this.credentials.installed;
        return {
            clientId: creds?.client_id,
            clientSecret: creds?.client_secret,
            redirectUri: creds?.redirect_uris
        };
    }

    /**
     * Uploads data to Google sheet
     */
    private async uploadData(): Promise<void> {
        try {
            const filter = { exported: { $in: [false, undefined] } };
            const update = { exported: true };
            const select = ['createdAt', 'deviceId', 'value'];
            const [TemperatureModel, HumidityModel, SwitchModel, StatusModel] = await Promise.all([
                getTemperatureModel(),
                getHumidityModel(),
                getSwitchModel(),
                getStatusModel()
            ]);
            const data = await Promise.all([
                TemperatureModel.find(filter).select(select),
                HumidityModel.find(filter).select(select),
                SwitchModel.find(filter).select(select),
                StatusModel.find(filter).select(select)
            ]);
            if (data.length !== SPREADSHEET_RANGES.length) throw Error('Inconsistent Database Entries');

            await Promise.all([
                TemperatureModel.updateMany(filter, update),
                HumidityModel.updateMany(filter, update),
                SwitchModel.updateMany(filter, update),
                StatusModel.updateMany(filter, update)
            ]);

            const sheets = google.sheets('v4');
            let uploadConfig: any[] = [];
            const spreadsheetId = [
                process.env.SPREADSHEET_ID_IOT as string,
                process.env.SPREADSHEET_ID_IOT as string,
                process.env.SPREADSHEET_ID_IOT as string,
                process.env.SPREADSHEET_ID_UPTIME as string
            ];
            const auth = this.authClient as any;
            const valueInputOption = 'USER_ENTERED';

            for (let i = 0; i < SPREADSHEET_RANGES.length; i += 1) {
                uploadConfig.push({
                    spreadsheetId: spreadsheetId[i],
                    requestBody: { values: data[i].map(x => [x.createdAt, x.deviceId, x.value]) },
                    range: SPREADSHEET_RANGES[i],
                    auth,
                    valueInputOption
                });
            }
            DiscordHandler.postWebhook({
                url: process.env.DISCORD_WEBHOOK as string,
                payload: 'Uploaded to Google Sheet 🚀'
            });
            uploadConfig.forEach(x => sheets.spreadsheets.values.append(x));
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.RUN_TIME_ERROR, message: error });
        }
    }
}
