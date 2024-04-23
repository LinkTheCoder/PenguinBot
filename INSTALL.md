This is a bot is using Node.js & [Discord.js](https://github.com/discordjs/discord.js) 

## Prerequisites

- Node.js (versions 18 or higher)
- Discord.js 14
- Discord
- Npm

## Getting Started

- Creating a Discord Developer account and add a bot. (Read the Discord Develeoper Docs for how to set up a bot: [Discord Developer Docs](https://discord.com/developers/docs/intro) 

Fork/clone the repository, install its dependencies:

```console
git clone https://github.com/LinkTheCoder/Pengu.git
```
## .env
Add a .env to the root of the project. This is to store ID's and API Keys you will need to connect your bot to Discord.

```console
{
CLIENT_ID=. . .
GUILD_ID=. . .
TOKEN=. . .
TENOR_KEY=. . .
YOUTUBE_KEY=. . .
}
```

## Run Bot

```console
npm start
```

## Commands
Commands are stored in the `commands` Folder.
Push updated commands to Discord:

```console
npm run deploy
```


## Youtube
To be able to fetch videos from Youtube you will need a YouTube API key. You can read more on Youtube Developers doc [Youtube Data API](https://developers.google.com/youtube/v3/getting-started)

You will also need to add a file to the root called `lastFetchedVideo.txt`

This is to store Youtube video ID's to prevent fetching same video multipel times.

## Tenor
To access Tenor you will as well need a API key. You can read more on Tenor Developers doc [Tenor API](https://tenor.com/gifapi/documentation)

## User Data
To use the command `world-penguin-day` you will need to store user data.
Create a file with a empty array in root called `user.json`

The file will store the users Discord ID and add true or false to send DM.

An example of a file with data:

```console
{
  "351263861103394817": {
    "receiveDMs": true
  }
}
```

## .gitignore
Remember to gitignore file you don't want other to access and/or upload the files to a server/database.

## Hosting
You can self-host locally on your PC or get a mini PC (Raspberry Pi etc). 

Or you could use cloud services that specialize on discord bot hosting like Sparkedhost. 
