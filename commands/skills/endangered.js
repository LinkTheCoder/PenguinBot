const { SlashCommandBuilder } = require('discord.js');

const penguinSpecies = [
  '<:NorthRock:1168841906189508669> Northern Rockhopper Penguin',
  '<:ErectCrested:1168842870283837530> Erect-crested Penguin',
  '<:African:1168921648850796604> African Penguin',
  '<:Galapagos:1168921646258737213> Galápagos Penguin',
  '<:YellowEyed:1168848121778933820> Yellow-eyed Penguin \n',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('endangered')
    .setDescription('Lists all current endangered penguin species'),
  async execute(interaction) {
    // Convert the array of penguin species into a formatted list
    const penguinList = penguinSpecies.join('\n');

    // Send the list as a response
    await interaction.reply(`## List of all current endangered penguin species :penguin:\n\n${penguinList}`);
  },
};
