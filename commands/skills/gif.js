const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from the .env file

const tenorAPIKey = process.env.TENOR_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Replies with a random penguin gif!'),
  async execute(interaction) {
    try {
      await interaction.deferReply(); // Ensure interaction is deferred

      // Fetch a random penguin gif from Tenor using the Google base URL
      const tenorURL = `https://tenor.googleapis.com/v2/search?q=Penguin&key=${tenorAPIKey}&limit=30`;

      const response = await axios.get(tenorURL, { timeout: 10000 }); // 10 seconds timeout

      // Check if the response and its properties exist
      if (response.data && response.data.results && response.data.results.length > 0) {
        // Get a random index to select a random GIF
        const randomIndex = Math.floor(Math.random() * response.data.results.length);

        // Access the gif URL directly from the "media_formats" property
        const gifUrl = response.data.results[randomIndex].media_formats.gif.url;

        // Send a message with the fetched gif without any text
        await interaction.editReply({
          files: [
            {
              attachment: gifUrl,
              name: 'Penguin.gif',
              spoiler: false,
            },
          ],
        });
      } else {
        throw new Error('No valid gifs found in the Tenor API response.');
      }
    } catch (error) {
      console.error('Error fetching gifs from Tenor:', error);
      await interaction.followUp('Sorry, an error occurred while fetching the gifs.');
    }
  },
};
