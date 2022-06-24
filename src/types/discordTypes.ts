import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';

import { EweLinkHandler } from '../handlers/eweLinkHandler';
import { EWELINK_DEVICES } from '../utils/constants';
import { eWeLinkLogin } from './eweLinkTypes';

export type DiscordCommand = {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
} & ChatInputApplicationCommandData;

export type DiscordWebhook = {
    url: string;
    payload: string;
};

/**
 * Hello Command
 */
export const Hello: DiscordCommand = {
    name: 'hello',
    description: 'Returns a greeting',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Hello there!';
        await interaction.followUp({ ephemeral: true, content });
    }
};

/**
 * Command that turns lamp off
 */
export const LampOff: DiscordCommand = {
    name: 'lamp-off',
    description: 'Turns off Lamp 🌻',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned Lamp Off 🌚';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LAMP_ID as string,
            value: 0
        };
        await Promise.all([EweLinkHandler.setState(switchData), interaction.followUp({ ephemeral: true, content })]);
    }
};

/**
 * Command that turns lamp on
 */
export const LampOn: DiscordCommand = {
    name: 'lamp-on',
    description: 'Turns on Lamp 🌸',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned Lamp On 🌞';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LAMP_ID as string,
            value: 1
        };
        await Promise.all([EweLinkHandler.setState(switchData), interaction.followUp({ ephemeral: true, content })]);
    }
};

/**
 * Command that turns light off
 */
export const LightOff: DiscordCommand = {
    name: 'light-off',
    description: 'Turns off light 🌞',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned Light light 🌞';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LIGHT_ID as string,
            value: 0
        };
        await Promise.all([EweLinkHandler.setState(switchData), interaction.followUp({ ephemeral: true, content })]);
    }
};

/**
 * Command that turns light on
 */
export const LightOn: DiscordCommand = {
    name: 'light-on',
    description: 'Turns on Light🌞',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned Light Off 🌞';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LIGHT_ID as string,
            value: 1
        };
        await Promise.all([EweLinkHandler.setState(switchData), interaction.followUp({ ephemeral: true, content })]);
    }
};

/**
 * Turn on Lights
 */
export const AllLightsOn: DiscordCommand = {
    name: 'all-on',
    description: 'Turns on All Lights ✨',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned on All Lights ✨';
        const switchData: eWeLinkLogin[] = EWELINK_DEVICES.map(x => ({
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: x,
            value: 1
        }));
        const _return = switchData.map(x => EweLinkHandler.setState(x));
        await Promise.all(_return);
        await interaction.followUp({ ephemeral: true, content });
    }
};

/**
 * Turn off Lights
 */
export const AllLightsOff: DiscordCommand = {
    name: 'all-off',
    description: 'Turns off All Lights 🌟',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'Turned off All Lights 🌟';
        const switchData: eWeLinkLogin[] = EWELINK_DEVICES.map(deviceId => ({
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId,
            value: 0
        }));
        const _return = switchData.map(x => EweLinkHandler.setState(x));
        await Promise.all(_return);
        await interaction.followUp({ ephemeral: true, content });
    }
};

export const DiscordCommands: DiscordCommand[] = [Hello, LampOff, LampOn, LightOff, LightOn, AllLightsOff, AllLightsOn];
