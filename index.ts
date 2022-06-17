import * as dotenv from 'dotenv';

import cron from 'node-cron';
import { GsheetController } from './src/controllers/gsheetController';
import MqttController from './src/controllers/mqttController';
import { SPREADSHEET_UPLOAD_SCHEDULE } from './src/utils/constants';
import { validateEnv } from './src/validation/envFileValidation';

dotenv.config();
const env = validateEnv();
if (env) throw Error(env.toString());

const mqttClient = new MqttController();
mqttClient.listen();

cron.schedule(SPREADSHEET_UPLOAD_SCHEDULE, () => {
    const _sheet = new GsheetController();
});
