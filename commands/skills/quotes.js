const { SlashCommandBuilder } = require('discord.js');

// Define an array of quotes and an array of image file paths
const quotes = [
    'Quote 1',
    'Quote 2',
    'Quote 3',
    // Add more quotes as needed
];

const imagePaths = [
    './img/quotes/MorganaQuote.png',
    './img/quotes/RyujiQuote.png',
    './img/quotes/FutabaQuote.png',
    // Add more image paths as needed
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Replies with random quotes!'),
    async execute(interaction) {
        // Select a random quote and image path
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

        // Send a message with the random quote and image attachment
        await interaction.reply({
            content: randomQuote,
            files: [
                {
                    attachment: randomImagePath,
                    name: 'RandomImage.png', // You can set a fixed name for the image
                },
            ],
        });
    },
};
