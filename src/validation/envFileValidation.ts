import Joi, { ValidationOptions } from 'joi';

import { ConsoleColorsEnum } from '../types/enums/generalEnums';

const validationOptions: ValidationOptions = { abortEarly: false, errors: { wrap: { label: "'" } } };
const envFileInputSchema = Joi.object({
    // MQTT Credentials
    mqttUsername: Joi.string().required(),
    mqttPassword: Joi.string().required(),
    mqttPort: Joi.string().required(),
    mqttHost: Joi.string().required(),

    // Mongo Credentials
    mongoClusterUri: Joi.string().required(),

    // eweLink Credentials
    eweLinkEmail: Joi.string().required().email(),
    eweLinkPassword: Joi.string().required(),
    lampId: Joi.string().required(),
    lightId: Joi.string().required(),
    // Discord Credentials
    discordClientId: Joi.string().required(),
    discordWebhook: Joi.string().required(),
    // Google Credentials
    googleToken: Joi.string().required()
});

export const validateEnv = () => {
    const data = {
        mqttUsername: process.env.MQTT_USERNAME,
        mqttPassword: process.env.MQTT_PASSWORD,
        mqttPort: process.env.MQTT_PORT,
        mqttHost: process.env.MQTT_HOST,
        mongoClusterUri: process.env.CLUSTER_URI,
        eweLinkEmail: process.env.EWELINK_EMAIL,
        eweLinkPassword: process.env.EWELINK_PASSWORD,
        discordClientId: process.env.DISCORD_CLIENT_ID,
        googleToken: process.env.GOOGLE_TOKEN,
        lampId: process.env.LAMP_ID,
        lightId: process.env.LIGHT_ID,
        discordWebhook: process.env.DISCORD_WEBHOOK
    };
    const { value: _value, error } = envFileInputSchema.validate(data, validationOptions);
    if (error) return error;
    console.log(ConsoleColorsEnum.BG_GREEN, "All '.env' variables loaded successfully 🌞");
    return null;
};
