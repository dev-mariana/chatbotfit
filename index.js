const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
require('dotenv').config();
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);
    let responseText = dfResponse.text;

    if(dfResponse.intent === 'Treino específico') {
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.Corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});