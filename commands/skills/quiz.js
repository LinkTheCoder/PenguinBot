const { SlashCommandBuilder } = require('discord.js');

// Define an array of quiz pairs, where each pair contains two image paths
const quizPairs = [
    ['./img/quiz/MsUsamiSilverRatio.png', './img/quiz/SilverRatio.png'],
    ['./img/quiz/MrInuiYoshitsune.png', './img/quiz/Yoshitsune.png'],
    // Add more quiz pairs here as needed
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Replies with a random school quiz!'),
    async execute(interaction) {
        // Select a random quiz pair
        const randomQuizIndex = Math.floor(Math.random() * quizPairs.length);
        const randomQuiz = quizPairs[randomQuizIndex];

        // Create an embed with the second image
        const embed = {
            image: {
                url: `attachment://${randomQuiz[1]}`,
            },
        };

        // Send the first image as an attachment and the embed as a response
        await interaction.reply({
            files: [
                {
                    attachment: randomQuiz[0],
                    name: 'Image1.png',
                },
            ],
            embeds: [embed],
        });
    },
};
