import { BaseCommandInteraction, Client, Interaction } from 'discord.js';
import { DiscordCommands, DiscordWebhook } from '../types/discordTypes';

import { ColorsEnum } from '../types/enums/generalEnums';
import { PROFILE_URL } from '../utils/constants';
// eslint-disable-next-line import/order
import { Webhook } from 'discord-webhook-node';

export class DiscordController {
    /**
     * Client  of discord controller
     */
    private client;

    constructor() {
        this.client = new Client({
            intents: []
        });
        this.listen(this.client);
        this.interaction(this.client);
        this.client.login(process.env.DISCORD_CLIENT_ID);
    }

    /**
     * Listener function
     * @param {Client} client
     */
    private listen(client: Client): void {
        client.on('ready', async () => {
            if (!client.user || !client.application) return;
            await client.application.commands.set(DiscordCommands);
            console.log(ColorsEnum.FG_CYAN, `${this.client.user.username} is online 🌟`, ColorsEnum.RESET);
        });
    }

    /**
     * Interactions handler
     * @param {Client} client
     */
    private interaction(client: Client): void {
        client.on('interactionCreate', async (interaction: Interaction) => {
            if (interaction.isCommand() || interaction.isContextMenu()) {
                await this.handleSlashCommand(interaction);
            }
        });
    }

    /**
     *  Slash command handler
     * @param {BaseCommandInteraction} interaction
     * @returns Promise<void>
     */
    private handleSlashCommand = async (interaction: BaseCommandInteraction): Promise<void> => {
        const slashCommand = DiscordCommands.find(c => c.name === interaction.commandName);
        if (!slashCommand) {
            interaction.followUp({ content: 'An error has occurred' });
            return;
        }
        await interaction.deferReply();
        slashCommand.run(this.client, interaction);
    };

    /**
     * Posts webhook to appropriate channel
     * @param {DiscordWebhook} data
     */
    public static postWebhook = async (data: DiscordWebhook): Promise<void> => {
        const hook = new Webhook(data.url);
        hook.setUsername('IoT Controller');
        hook.setAvatar(PROFILE_URL);
        await hook.send(data.payload);
    };
}
