import Joi from 'joi';

export const webhookPostInputSchema = Joi.object({
    url: Joi.string().required().uri(),
    payload: Joi.string().required().max(150)
});
