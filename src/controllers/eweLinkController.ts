import { eweLinkDeviceState, eWeLinkLogin } from '../types/eweLinkTypes';

// eslint-disable-next-line import/order
import eWelink from 'ewelink-api';
import { LogsHandler } from '../handlers/logsHandler';
import { LogTypeEnum } from '../types/enums/logsEnums';

export class EweLinkController {
    /**
     * Sets the state of ewelink switch
     * @param {eWeLinkLogin} data
     */
    static async setState(data: eWeLinkLogin) {
        try {
            // eslint-disable-next-line new-cap
            const conn = new eWelink({ email: data.email, password: data.password });
            await conn.setDevicePowerState(data.deviceId, eweLinkDeviceState[data.value]);
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }
}
