const { Client, Intents } = require('discord.js');
const config = require('../config.json');
const { sendTransaction } = require('./starex');

const client = new Client({ 
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS 
    ], 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {

    if(reaction.partial) await reaction.fetch();
    //if(user.id === reaction.message.author.id) return;
    if(reaction.emoji.name !== '⭐') return;

    await sendTransaction(client, reaction.message, user, reaction.message.author, 1);
});

client.login(config.bot.token);