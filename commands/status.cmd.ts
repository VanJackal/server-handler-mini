import {Interaction, SlashCommandBuilder} from "discord.js"
import {getStatus} from "../status"

export = {
	data: new SlashCommandBuilder()
		.setName("status")
		.setDescription("Get the status of the server"),
	async execute (interaction) {
		const state = await getStatus();
		await interaction.reply(`Players: ${state.online}\n${state.info}`);
	}
}
