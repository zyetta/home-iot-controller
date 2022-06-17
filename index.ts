import * as dotenv from 'dotenv';

import { GsheetController } from './src/controllers/gsheetController';
import MqttController from './src/controllers/mqttController';
import { validateEnv } from './src/validation/envFileValidation';

dotenv.config();
const env = validateEnv();
if (env) throw Error(env.toString());

const mqttClient = new MqttController();
mqttClient.listen();

const gsheet = new GsheetController();
