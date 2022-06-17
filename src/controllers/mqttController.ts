import * as mqtt from 'mqtt';

import { ConsoleColorsEnum } from '../types/enums/generalEnums';
import { MQTT_TOPICS } from '../utils/constants';
import MqttHandler from '../handlers/mqttHandler';

export default class MqttController {
    /**
     * Client  of mqtt controller
     */
    private client;

    /**
     * Client options of mqtt controller
     */
    private clientOptions;

    /**
     * Creates MQTT Client
     */
    constructor() {
        this.setClientOptions();
        this.client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, this.getClientOptions());
        console.log(
            ConsoleColorsEnum.FG_GREEN,
            `Connected to Broker:\tmqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`
        );
    }

    /**
     * Topic Listener
     */
    public async listen() {
        this.client.on('connect', () => {
            MQTT_TOPICS.map((topic: string) => {
                this.client.subscribe(topic, () => {
                    console.log(ConsoleColorsEnum.FG_YELLOW, `Subscribed to:\t\t${topic}`);
                    this.client.publish('server/1', `Subscribed to ${topic}!\t-\t${Date()}`);
                });
                return topic;
            });
            this.handlerSetter();
        });
    }

    /**
     * Sets callback function for messages
     */
    private handlerSetter() {
        const handler = new MqttHandler();
        this.client.on('message', (topic, message) => handler.messageReceived(topic, message));
    }

    /**
     * Sets MQTT Client Options
     */
    private setClientOptions() {
        this.clientOptions = { username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD };
    }

    /**
     * Gets MQTT Client Options
     * @returns MQTT Client Options
     */
    private getClientOptions() {
        return this.clientOptions;
    }
}
