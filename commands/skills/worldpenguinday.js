const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('world-penguin-day')
    .setDescription('Choose to receive or stop receiving DMs on World Penguin Day.')
    .addStringOption(option =>
      option
        .setName('dm')
        .setDescription('Choose an DM option')
        .setRequired(true)
        .addChoices(
          { name: 'Receive', value: 'receive' },
          { name: 'Stop', value: 'stop' }
        )
    ),
  async execute(interaction) {
    const { user } = interaction;
    const userId = user.id;
    const dm = interaction.options.getString('dm');

    if (dm === 'receive') {
      // Code for setting the user's preference to receive DMs on World Penguin Day
      const userData = require('../../user.json') || {};

      userData[userId] = { receiveDMs: true };
      fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
      await interaction.reply({ content: 'You will receive a DM on World Penguin Day!', ephemeral: true });
    } else if (dm === 'stop') {
      // Code for stopping the user from receiving DMs on World Penguin Day
      const userData = require('../../user.json') || {};

      if (userData[userId]) {
        userData[userId].receiveDMs = false;
        fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
        await interaction.reply({ content: 'You will no longer receive DMs on World Penguin Day.', ephemeral: true });
      } else {
        await interaction.reply({ content: 'You are not set to receive DMs on World Penguin Day.', ephemeral: true });
      }
    }
  },
};
