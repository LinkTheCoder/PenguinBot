const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
		const displayName = interaction.member.displayName;

		// Send a message with text and attachment
		await interaction.reply({
			content: `Hi, ${displayName}!`,
			files: [
				{
					attachment: './img/Default.gif', // Correct relative path to your image file
					name: 'Default.gif', // Replace 'your_image.png' with the actual image file name
				},
			],
		});
	},
};
