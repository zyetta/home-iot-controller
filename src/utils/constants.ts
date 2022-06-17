import { MqttTopicsEnum } from '../types/enums/mqttEnums';

export const MQTT_TOPICS: string[] = [
    `${MqttTopicsEnum.TEMPERATURE}/#`,
    `${MqttTopicsEnum.HUMIDITY}/#`,
    `${MqttTopicsEnum.SWITCH}/#`
];

export const DATABASE = 'database';
export const SPREADSHEET_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
export const TOKEN_PATH = '.token.json';
export const SPREADSHEET_RANGES = ['Temperature!A:C', 'Humidity!A:C', 'Switch!A:C'];
