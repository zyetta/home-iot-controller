import Joi from 'joi';

export const eweLinkLoginInputSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
    value: Joi.number().required().valid(0, 1)
});
