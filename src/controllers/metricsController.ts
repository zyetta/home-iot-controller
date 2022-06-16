import { getHumidityModel, Humidity } from '../models/humidityModel';
import { getSwitchModel, Switch } from '../models/switchModel';
import { getTemperatureModel, Temperature } from '../models/temperatureModel';

import { EweLinkHandler } from '../handlers/eweLinkHandler';
import { eWeLinkLogin } from '../types/eweLinkTypes';
import { LogsHandler } from '../handlers/logsHandler';
import { LogTypeEnum } from '../types/enums/logsEnums';

export class MetricsController {
    /**
     * Stores temperature data into the database
     * @param {Temperature} data
     */
    static async storeTemperature(data: Temperature) {
        const TemperatureModel = await getTemperatureModel();
        try {
            await TemperatureModel.create(data);
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }

    /**
     * Stores humidity data into the database
     * @param {Humidity} data
     */
    static async storeHumidity(data: Humidity) {
        const HumidityModel = await getHumidityModel();
        try {
            await HumidityModel.create(data);
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }

    /**
     * Stores switch data into the database
     * @param {Switch} data
     */
    static async toggleSwitch(data: Switch) {
        const SwitchModel = await getSwitchModel();
        try {
            const switchData: eWeLinkLogin = {
                email: process.env.EWELINK_EMAIL as string,
                password: process.env.EWELINK_PASSWORD as string,
                ...data
            };
            EweLinkHandler.setState(switchData);
            await SwitchModel.create(data);
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }
}
