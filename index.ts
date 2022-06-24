/* eslint-disable import/first */
import * as dotenv from 'dotenv';
import cron from 'node-cron';
import { validateEnv } from './src/validation/envFileValidation';

dotenv.config();
const env = validateEnv();
if (env) throw Error(env.toString());

import { DiscordController } from './src/controllers/discordController';
import { GsheetController } from './src/controllers/gsheetController';
import MqttController from './src/controllers/mqttController';
import { DiscordHandler } from './src/handlers/discordHandler';
import { SPREADSHEET_UPLOAD_SCHEDULE } from './src/utils/constants';

const mqttClient = new MqttController();
mqttClient.listen();

cron.schedule(SPREADSHEET_UPLOAD_SCHEDULE, () => {
    const _sheet = new GsheetController();
});

const _discord = new DiscordController();
DiscordHandler.postWebhook({ url: process.env.DISCORD_WEBHOOK as string, payload: "I'm Online 🌞" });
