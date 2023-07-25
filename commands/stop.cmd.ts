import {Interaction, SlashCommandBuilder} from "discord.js"
import {execSync} from 'child_process'
import {logger} from '../logger'

export = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stop the Server"),
	async execute(interaction) {
		execSync(`echo stop >> ${process.env.SOCKET}`)
		logger.info("Sent stop command")
		interaction.reply("Stopping")
	}
}