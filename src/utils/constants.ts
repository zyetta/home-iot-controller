import { MqttTopicsEnum } from '../types/enums/mqttEnums';

export const MQTT_TOPICS: string[] = [
    `${MqttTopicsEnum.TEMPERATURE}/#`,
    `${MqttTopicsEnum.HUMIDITY}/#`,
    `${MqttTopicsEnum.SWITCH}/#`
];

export const DATABASE = 'database';
