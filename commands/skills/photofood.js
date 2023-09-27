const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('photofood')
		.setDescription('Shows food photos!'),
	async execute(interaction) {
		// Send a message with text and a single picture
		await interaction.reply({
			content: 'Oi, here is some delicious food photos! :kissing_cat:',
			files: [
				{
					attachment: './img/Food1.png',
					name: 'Food1.png',
				},
				{
					attachment: './img/Food2.png',
					name: 'Food2.png',
				},
				{
					attachment: './img/Food3.png',
					name: 'Food3.png',
				},
				{
					attachment: './img/Food4.png',
					name: 'Food4.png',
				},
			],
		});
	},
};
