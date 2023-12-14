const { SlashCommandBuilder } = require('discord.js');
const penguinFacts = require('../../data/penguinFacts.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Lists penguin species with filter options')
    .addStringOption(option =>
      option.setName('filter')
        .setDescription('Specify the filter')
        .setRequired(true)
        .addChoices(
          { name: 'All', value: 'all' },
          { name: 'Endangered', value: 'endangered' }
        )),
  async execute(interaction) {
    try {
      const filterOption = interaction.options.getString('filter');
      let title, filteredPenguins;

      if (filterOption === 'all') {
        // Show all species
        title = 'List of All Penguin Species';
        filteredPenguins = Object.values(penguinFacts)
          .map(penguin => `${penguin.emoji} ${penguin.commonName}`)
          .join('\n');
      } else if (filterOption === 'endangered') {
        // Show only endangered species
        title = 'List of Endangered Penguin Species';
        filteredPenguins = Object.values(penguinFacts)
          .filter(penguin => penguin.redListStatus === 'Endangered')
          .map(penguin => `${penguin.emoji} ${penguin.commonName}`)
          .join('\n');
      } else {
        await interaction.followUp('Invalid filter option. Please choose "all" or "endangered".');
        return;
      }

      await interaction.reply(`## ${title} :penguin:\n\n${filteredPenguins}`);
    } catch (error) {
      console.error(error);
      await interaction.followUp('There was an error while executing this command!');
    }
  }
};
