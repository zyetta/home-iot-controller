import { MqttTopicsEnum } from './enums/mqttEnums';

export type TemperaturePayload = {
    option: MqttTopicsEnum.TEMPERATURE;
    value: number;
    deviceId: string;
};

export type HumidityPayload = {
    option: MqttTopicsEnum.HUMIDITY;
    value: number;
    deviceId: string;
};

export type SwitchPayload = {
    option: MqttTopicsEnum.SWITCH;
    value: number;
    deviceId: string;
};

export type MqttPayload = TemperaturePayload | HumidityPayload | SwitchPayload;
