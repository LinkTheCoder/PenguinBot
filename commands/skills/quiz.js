const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Get a random penguin quiz'),
                
    async execute(interaction) {
        const filePath = `./data/quiz.json`;

        try {
            const rawData = fs.readFileSync(filePath);
            const data = JSON.parse(rawData);

            // Select a random quiz question
            const randomQuestionIndex = Math.floor(Math.random() * data.quizzes.length);
            const randomQuestion = data.quizzes[randomQuestionIndex];

            // Get the corresponding quiz question and options
            const question = randomQuestion.question;
            const options = randomQuestion.options;

            // Get the correct option
            const correctOption = options.find(option => option.isCorrect);

            // Get the corresponding button labels and custom IDs from the options
            const buttons = options.map((option, index) => ({
                label: option.option,
                customId: `option${index + 1}`,
                isCorrect: option.isCorrect,
            }));

            // Create buttons for the quiz options
            const buttonComponents = buttons.map(button => new ButtonBuilder()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(ButtonStyle.Primary)
            );

            // Create an action row with the buttons
            const actionRow = new ActionRowBuilder()
                .addComponents(buttonComponents);

            // Send the quiz question as a response
            await interaction.reply({
                content: question,
                components: [actionRow],
            });

            // Wait for the user to interact with the buttons
            const filter = i => i.customId.startsWith('option');
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async (buttonInteraction) => {
                const selectedButton = buttons.find(button => button.customId === buttonInteraction.customId);

                if (selectedButton && selectedButton.isCorrect) {
                    // Correct answer
                    await buttonInteraction.reply({ content: 'Correct answer!', ephemeral: true });
                } else {
                    // Wrong answer
                    await buttonInteraction.reply({ content: `Incorrect!\nThe correct answer is: ${correctOption.option}`, ephemeral: true });
                }
            });

            collector.on('end', (collected) => {
                // Cleanup or handle the end of the interaction if needed
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the quiz data.', ephemeral: true });
        }
    },
};
