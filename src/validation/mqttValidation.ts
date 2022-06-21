import Joi from 'joi';
import { MqttTopicsEnum } from '../types/enums/mqttEnums';

export const MqttPayloadInputSchema = Joi.object({
    option: Joi.string()
        .required()
        .valid(...Object.values(MqttTopicsEnum)),
    value: Joi.when('option', {
        is: MqttTopicsEnum.SWITCH,
        then: Joi.number().required().valid(0, 1),
        otherwise: Joi.number().required().default(0)
    }),
    deviceId: Joi.string().required()
});
