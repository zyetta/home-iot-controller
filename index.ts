import * as dotenv from 'dotenv';

import MqttController from './src/controllers/mqttController';

dotenv.config();

const mqttClient = new MqttController();
mqttClient.listen();
