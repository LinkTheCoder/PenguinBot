const { SlashCommandBuilder } = require('discord.js');
const { ActionRow, Button, ButtonStyle } = require('discord.js');

// Define an array of quiz pairs, where each pair contains two image paths
const quizPairs = [
    ['./img/quiz/MsUsamiSilverRatio.png', 'https://i.imgur.com/ByqTspE.png'],
    ['./img/quiz/MrInuiYoshitsune.png', 'https://i.imgur.com/67DETfN.png'],
    // Add more quiz pairs here as needed
];

// Define an array of custom button labels and custom IDs for each quiz pair
const buttonInfo = [
    [
        { label: '1:1.732', customId: 'option1' },
        { label: '1:1.414', customId: 'option2' },
        { label: '1:3.303', customId: 'option3' },
    ],
    [
        // Define custom button labels and custom IDs for the second quiz pair
        { label: 'The Muromachi Period', customId: 'choiceA' },
        { label: 'The Kamakura period', customId: 'choiceB' },
        { label: 'The Heian period', customId: 'choiceC' },
    ],
    // Add more button labels and custom IDs for additional quiz pairs here as needed
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Replies with a random school quiz!'),
    async execute(interaction) {
        // Select a random quiz pair
        const randomQuizIndex = Math.floor(Math.random() * quizPairs.length);
        const randomQuiz = quizPairs[randomQuizIndex];
        const imageUrl = randomQuiz[1];

        // Get the corresponding button labels and custom IDs from buttonInfo array
        const buttons = buttonInfo[randomQuizIndex];

        // Create an array of Button objects for the buttons
        const buttonComponents = buttons.map(button => new Button()
            .setLabel(button.label)
            .setCustomId(button.customId)
            .setStyle(ButtonStyle.Primary) // Change button style as needed
        );

        // Create an ActionRow with the buttons
        const actionRow = new ActionRow()
            .addComponents(buttonComponents);

        // Create an embed with the second image and custom buttons
        const embed = {
            image: {
                url: imageUrl,
            },
        };

        // Send the first image as an attachment and the embed with custom buttons as a response
        await interaction.reply({
            files: [
                {
                    attachment: randomQuiz[0],
                    name: 'Image1.png',
                },
            ],
            embeds: [embed],
            components: [actionRow], // Add the ActionRow with buttons
        });
    },
};
