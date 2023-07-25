import * as path from "path"
import * as fs from "fs"
import {Client, Collection, EmbedBuilder, GatewayIntentBits} from 'discord.js';
import {logger} from "./logger"

const intents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.DirectMessageReactions
]

const client = new Client({intents:intents})

client.on("ready", () => {
	logger.info(`Logged in as ${client.user.tag}!`)
})

client.commands = new Collection();
const commandsPath = path.join(__dirname,'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cmd.js'))
for (const file of commandFiles) {
	const filePath = path.join(commandsPath,file)
	const command = require(filePath)
	client.commands.set(command.data.name,command);
}

client.on('interactionCreate', async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName)

	if(!command) return

	try{
		await command.execute(interaction)
	} catch (e) {
		logger.error(e)
		logger.error(JSON.stringify(e))
		const embed = new EmbedBuilder()
			.setColor("#ff0000")
			.addFields({name:"Error",value:`Error in command execution`})
			.setTimestamp()
	}
})

client.login(process.env.TOKEN)