import * as mqtt from 'mqtt';

import { MQTT_TOPICS } from '../constants';

export default class MqttController {
    private client;

    private clientOptions;

    /**
     * Creates MQTT Client
     */
    constructor() {
        this.setClientOptions();
        this.client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, this.getClientOptions());
        console.log(`Connected to Broker:\tmqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`);
    }

    public async listen() {
        this.client.on('connect', () => {
            MQTT_TOPICS.map((topic: string) => {
                this.client.subscribe(topic, () => {
                    console.log(`Subscribed to:\t\t${topic}`);
                    this.client.publish('server/1', `Subscribed to ${topic}!\t-\t${Date()}`);
                });
                return topic;
            });
            this.messageHandler();
        });
    }

    private messageHandler() {
        this.client.on('message', (topic, message) => {
            console.log(topic.toString());
            console.log(message.toString());
        });
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
