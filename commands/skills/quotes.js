const { SlashCommandBuilder } = require('discord.js');

// Define an array of image file paths
const imagePaths = [
    './img/quotes/MorganaQuote.png',
    './img/quotes/RyujiQuote.png',
    './img/quotes/FutabaQuote.png',
    // Add more image paths as needed
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Replies with a random image!'),
    async execute(interaction) {
        // Select a random image path
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

        // Send only the random image as a response
        await interaction.reply({
            files: [
                {
                    attachment: randomImagePath,
                    name: 'RandomImage.png', // You can set a fixed name for the image
                },
            ],
        });
    },
};
