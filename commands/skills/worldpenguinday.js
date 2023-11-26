const { SlashCommandBuilder } = require('discord.js');

// Function to calculate days left until a specific date
function daysUntil(targetDate) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);
  targetDateTime.setFullYear(currentDate.getFullYear()); // Set the target year to the current year
  if (targetDateTime < currentDate) {
    targetDateTime.setFullYear(currentDate.getFullYear() + 1); // If target date has passed for this year, set it to next year
  }
  const differenceInTime = targetDateTime.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('world-penguin-day')
    .setDescription('Countdown to World Penguin Day'),
  async execute(interaction) {
    // Set the target date for World Penguin Day (April 25th)
    const worldPenguinDayDate = new Date('04-25');

    // Calculate days left
    const daysLeft = daysUntil(worldPenguinDayDate);

    // Respond with the countdown
    await interaction.reply(`🐧 World Penguin Day is in ${daysLeft} days! 🐧`);
  },
};
