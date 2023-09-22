require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => console.log('Ready!'));

client.on('messageCreate', (message) => {
  if (message.content.includes('hello')) {
    return message.reply('Hi! UwU');
  }

  if (message.content === '!help') {
    return message.reply("there's no help for you, you're on your own");
  }
});

client.login(process.env.DISCORD_TOKEN);