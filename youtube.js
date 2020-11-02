const YouTube = require('youtube-node');
const config = require('./youtube-config.json');
require('dotenv').config();
const youtube = new YouTube();
youtube.setKey(process.env.TOKEN_YOUTUBE);

const searchVideoURL = (message, queryText) => {
    return new Promise((resolve, reject) => {
        youtube.search(`Exercícios em casa para ${queryText}`, 2, (error, result) => {
            if(!error) {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            } 
            else {
                reject('Ocorreu um erro!');
            }
        });
    })
}

module.exports.searchVideoURL = searchVideoURL;