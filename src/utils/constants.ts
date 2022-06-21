import { MqttTopicsEnum } from '../types/enums/mqttEnums';

export const MQTT_TOPICS: string[] = [
    `${MqttTopicsEnum.TEMPERATURE}/#`,
    `${MqttTopicsEnum.HUMIDITY}/#`,
    `${MqttTopicsEnum.SWITCH}/#`
];

export const DATABASE = 'database';
// R+W to all Spreadsheets
export const SPREADSHEET_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
export const TOKEN_PATH = '.token.json';
// The order of these values will affect the GsheetController
export const SPREADSHEET_RANGES = ['Temperature!A:C', 'Humidity!A:C', 'Switch!A:C'];
export const SPREADSHEET_UPLOAD_SCHEDULE = '0 * * * *';

// eslint-disable-next-line operator-linebreak
export const PROFILE_URL =
    // eslint-disable-next-line max-len
    'https://helios-i.mashable.com/imagery/articles/02Ml12Tnr1wIjBQeoSNS3ss/hero-image.fill.size_1248x702.v1623370444.jpg';
