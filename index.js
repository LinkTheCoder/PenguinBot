const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
	checkPenguinDay();
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN);

// CHECK WORLD PENGUIN DAY
function checkPenguinDay() {
	const userData = require('./user.json');
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript.
	const currentDay = currentDate.getDate();
	const penguinDay = { month: 4, day: 25 };

	// Check for World Penguin Day and send DMs to users who opted to receive them.
	for (const userId in userData) {
		const { receiveDMs, lastSentYear } = userData[userId];

		if (receiveDMs && currentMonth === penguinDay.month && currentDay === penguinDay.day && currentYear !== lastSentYear) {
			// It's World Penguin Day! Send a DM.
			client.users.send(userId, {
				content: '## Happy World Penguin Day! 🎉',
				files: [
					{
						attachment: './img/PenguinDay.gif',
						name: 'PenguinDay.gif',
					},
				],
			});

			// Update the last sent year to the current year.
			userData[userId].lastSentYear = currentYear;
		}
	}

	// Save the updated data back to the JSON file.
	fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));

	// Schedule the next check
	setTimeout(checkPenguinDay, 60 * 60 * 1000);
}
