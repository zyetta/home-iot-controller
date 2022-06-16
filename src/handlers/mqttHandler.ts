import { LogsHandler } from './logsHandler';
import { LogTypeEnum } from '../types/enums/logsEnums';
import { MetricsController } from '../controllers/metricsController';
import { MqttPayload } from '../types/mqttTypes';
import { MqttPayloadInputSchema } from '../validation/mqttValidation';
import { MqttTopicsEnum } from '../types/enums/mqttEnums';
// eslint-disable-next-line import/order
import { ValidationOptions } from 'joi';

export default class MqttHandler {
    /**
     * Validation options of mqtt handler
     */
    private validationOptions: ValidationOptions = { abortEarly: false, errors: { wrap: { label: "'" } } };

    /**
     * Handler for incoming messages
     * @param {any} topic
     * @param {any} message
     */
    public async messageReceived(topic: any, message: any) {
        try {
            const _topic = topic.split('/')[0];
            const data: MqttPayload = { option: _topic, deviceId: topic.split('/')[1], value: message.toString() };
            const { value, error } = MqttPayloadInputSchema.validate(data, this.validationOptions);
            if (error) throw error;
            switch (_topic) {
                case MqttTopicsEnum.HUMIDITY:
                    await MetricsController.storeHumidity({ deviceId: value.deviceId, value: value.value });
                    break;
                case MqttTopicsEnum.TEMPERATURE:
                    await MetricsController.storeTemperature({ deviceId: value.deviceId, value: value.value });
                    break;
                case MqttTopicsEnum.SWITCH:
                    await MetricsController.toggleSwitch({ deviceId: value.deviceId, value: value.value });
                    break;
                default:
                    break;
            }
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }
}
