import Joi from 'joi';

export const LogsInputSchema = Joi.object({
    topic: Joi.string().required(),
    message: Joi.string().required()
});
