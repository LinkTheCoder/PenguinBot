const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Load environment variables from the .env file
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const channelId = '1184800068918841384';
const apiKey = process.env.YoutubeKey; // Access environment variable using process.env
const channelIdToTrack = 'UCtckgmUcpzqGnzcs7xEqMzQ';

// Load the last fetched video IDs from a file, or initialize it as an empty array
let lastFetchedVideoIds = [];
try {
  const fileData = fs.readFileSync('./lastFetchedVideo.txt', 'utf8');
  lastFetchedVideoIds = fileData.split('\n').filter(id => id.trim() !== '');
} catch (error) {
  console.error('Error loading lastFetchedVideo:', error);
  lastFetchedVideoIds = [];
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN); // Access the token from the .env file using process.env

async function checkForNewVideo() {
  try {
    // Fetch the latest video from the YouTube channel
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelIdToTrack}&part=snippet,id&order=date&maxResults=1`
    );

    if (response.data.items.length > 0) {
      const video = response.data.items[0];
      // Extract the video ID
      const videoId = video.id.videoId;

      // Check if this is a new video by comparing with the existing video IDs
      if (!lastFetchedVideoIds.includes(videoId)) {
        // Append the new video ID to the array
        lastFetchedVideoIds.push(videoId);

        // Write the updated array to the file
        fs.writeFileSync('./lastFetchedVideo.txt', lastFetchedVideoIds.join('\n'), 'utf8');

        // Send a message to the Discord channel
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          channel.send(`New video: ${video.snippet.title}\n${video.snippet.description}\nhttps://www.youtube.com/watch?v=${videoId}`);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
  }
}

module.exports = {
  checkForNewVideo,
};
