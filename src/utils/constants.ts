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
