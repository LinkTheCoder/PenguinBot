const { SlashCommandBuilder } = require('discord.js');
const penguinFacts = require('../../data/penguinFacts.json');

function normalizeString(str) {
  // Normalize the string to remove accents and special characters
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Replace spaces with hyphens and convert to lowercase
  str = str.replace(/ /g, '-').toLowerCase();
  return str;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('facts')
    .setDescription('Facts about selected penguin species')
    .addStringOption(option =>
      option.setName('species')
        .setDescription('Name of the penguin species (eg. king, king penguin, kingpenguin)')
        .setRequired(true),
    ),
    async execute(interaction) {
      const userInput = interaction.options.getString('species').toLowerCase();
  
      // Attempt to find an exact match
      let matchingSpecies = penguinFacts[userInput];
  
      // If no exact match is found, search for a match with "penguin" omitted
      if (!matchingSpecies) {
        const speciesName = userInput.replace('penguin', '').trim();
  
        for (const key in penguinFacts) {
          if (normalizeString(key).includes(speciesName)) {
            matchingSpecies = penguinFacts[key];
            break;
          }
        }
      }
  
      // Use a regular expression to match common name variations
      if (!matchingSpecies) {
        const foundByRegex = Object.keys(penguinFacts).find(key => {
          const normalizedKey = normalizeString(key);
          const regex = new RegExp(`^${normalizedKey.replace('penguin', '').trim()}\\b`, 'i');
          return regex.test(normalizeString(userInput));
        });
  
        if (foundByRegex) {
          matchingSpecies = penguinFacts[foundByRegex];
        }
      }
  
      if (matchingSpecies) {
        const {
          emoji,
          commonName,
          scientificName,
          fact,
          imageURL,
          averageLifespan,
          size,
          weight,
          redListStatus,
          location,
        } = matchingSpecies;
  
        let response = `## ${commonName} ${emoji}\n`;
        let files = [];
  
        if (imageURL) {
          files.push({
            attachment: imageURL,
            name: 'image.png'
          });
        }
  
        response += `${fact}\n\n`;
        response += `**Common Name:** ${commonName}\n`;
        response += `**Scientific Name:** ${scientificName}\n`;
        response += `**Average Lifespan:** ${averageLifespan}\n`;
        response += `**Size:** ${size}\n`;
        response += `**Weight:** ${weight}\n`;
        response += `**Location:** ${location}\n`;
        response += `**Red List Status:** ${redListStatus}\n`;
  
        await interaction.reply({
          content: response,
          files: files
        });
      } else {
        await interaction.reply("Sorry, I don't have information on that penguin species.");
      }
    },
  };