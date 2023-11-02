const { SlashCommandBuilder } = require('discord.js');

const penguinSpecies = [
  '<:Emperor:1168547594490880122> Emperor Penguin',
  '<:King:1168547591890419713> King Penguin \n',
  '<:Adelie:1168554341326659804> Adélie Penguin',
  '<:Gentoo:1168554336410927124> Gentoo Penguin',
  '<:Chinstrap:1168554339351142451> Chinstrap Penguin \n',
  '<:Macaroni:1168568725616738354> Macaroni Penguin',
  '<:SouthRock:1168838221480874014> Southern Rockhopper Penguin',
  '<:NorthRock:1168841906189508669> Northern Rockhopper Penguin',
  '<:Fiordland:1168840168820723733> Fiordland Penguin',
  '<:Snares:1168840198688346203> Snares Penguin',
  '<:ErectCrested:1168842870283837530> Erect-crested Penguin',
  '<:Royal:1168568723049816185> Royal Penguin \n',
  '<:African:1168921648850796604> African Penguin',
  '<:Magellanic:1168921653078663190> Magellanic Penguin',
  '<:Galapagos:1168921646258737213> Galápagos Penguin',
  '<:Humboldt:1168921650402705529> Humboldt Penguin \n',
  '<:YellowEyed:1168848121778933820> Yellow-eyed Penguin \n',
  '<:Little:1168848119279132742> Little Penguin \n',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Lists all 18 penguin species'),
  async execute(interaction) {
    // Convert the array of penguin species into a formatted list
    const penguinList = penguinSpecies.join('\n');

    // Send the list as a response
    await interaction.reply(`## List of all 18 Penguin Species :penguin:\n\n${penguinList}`);
  },
};
