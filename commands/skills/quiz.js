const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

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

        // Create buttons for the quiz options
        const buttonComponents = buttons.map(button => new ButtonBuilder()
            .setCustomId(button.customId)
            .setLabel(button.label)
            .setStyle(ButtonStyle.PRIMARY)
        );

        // Create an action row with the buttons
        const actionRow = new ActionRowBuilder()
            .addComponents(buttonComponents);

        // Create an embed with the second image
        const embed = {
            image: {
                url: imageUrl,
            },
        };

        // Send the first image as an attachment and the embed with buttons as a response
        await interaction.reply({
            files: [
                {
                    attachment: randomQuiz[0],
                    name: 'Image1.png',
                },
            ],
            embeds: [embed],
            components: [actionRow],
        });

        // Wait for the user to interact with the buttons for quiz pair 1
        if (randomQuizIndex === 0) {
            const filter = i => i.customId.startsWith('option'); // Filter for option buttons
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 }); // Adjust the time as needed

            collector.on('collect', async (buttonInteraction) => {
                const selectedLabel = buttons.find(button => button.customId === buttonInteraction.customId)?.label;

                if (selectedLabel === '1:1.414') {
                    // Correct answer for quiz pair 1
                    await buttonInteraction.reply({ content: 'Correct answer!', ephemeral: true });
                } else {
                    // Wrong answer for quiz pair 1
                    await buttonInteraction.reply({ content: 'Wrong answer.', ephemeral: true });
                }
            });

            collector.on('end', (collected) => {
                // Cleanup or handle the end of the interaction for quiz pair 1 if needed
            });
        }

        // Wait for the user to interact with the buttons for quiz pair 2
        if (randomQuizIndex === 1) {
            const filter = i => i.customId.startsWith('choice'); // Filter for choice buttons
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 }); // Adjust the time as needed

            collector.on('collect', async (buttonInteraction) => {
                const selectedLabel = buttons.find(button => button.customId === buttonInteraction.customId)?.label;

                if (selectedLabel === 'The Heian period') {
                    // Correct answer for quiz pair 2
                    await buttonInteraction.reply({ content: 'Correct answer!', ephemeral: true });
                } else {
                    // Wrong answer for quiz pair 2
                    await buttonInteraction.reply({ content: 'Wrong answer.', ephemeral: true });
                }
            });

            collector.on('end', (collected) => {
                // Cleanup or handle the end of the interaction for quiz pair 2 if needed
            });
        }
    },
};
