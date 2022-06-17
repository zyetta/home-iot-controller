import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';

import { EweLinkHandler } from '../handlers/eweLinkHandler';
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

        await interaction.followUp({
            ephemeral: true,
            content
        });
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
        EweLinkHandler.setState(switchData);
        await interaction.followUp({ ephemeral: true, content });
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
        EweLinkHandler.setState(switchData);
        await interaction.followUp({ ephemeral: true, content });
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
        const content = 'Turned Lamp Off 🌚';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LAMP_ID as string,
            value: 0
        };
        EweLinkHandler.setState(switchData);
        await interaction.followUp({
            ephemeral: true,
            content
        });
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
        const content = 'Turned Lamp Off 🌞';
        const switchData: eWeLinkLogin = {
            email: process.env.EWELINK_EMAIL as string,
            password: process.env.EWELINK_PASSWORD as string,
            deviceId: process.env.LAMP_ID as string,
            value: 1
        };
        EweLinkHandler.setState(switchData);
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};

export const DiscordCommands: DiscordCommand[] = [Hello, LampOff, LampOn, LightOff, LightOn];
