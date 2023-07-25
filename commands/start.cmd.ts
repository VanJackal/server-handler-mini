import {Interaction, SlashCommandBuilder} from "discord.js"
import {execSync} from 'child_process'
import {logger} from '../logger'

export = {
	data: new SlashCommandBuilder()
		.setName("start")
		.setDescription("Start the Server"),
	async execute(interaction) {
		execSync(`echo \"say server is already on lmao\" >> ${process.env.SOCKET}`)
		logger.info("Sent start command")
		interaction.reply("Starting")
	}
}