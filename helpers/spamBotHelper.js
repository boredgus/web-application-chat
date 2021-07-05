const generateTime = require('../client/src/settings/generateTime');

const words = ['12', 'qwerty', 'juice', 'good', 'awesome', 'nice', 'bad', 'nodejs', 'information', 'extra', 'intro', 'laptop', 'midnight', 'moon', 'mood', 'introvert', 'function', 'asynchronous', 'phon', 'baby', 'at', 'last'];


function generateWordCount() {
    return Math.ceil(Math.random() * words.length);
}
function generateWordNumber() {
    return Math.floor(Math.random() * words.length);
}

function generateInterval() {
    return (Math.ceil(Math.random() * 60) + 60) * 1000;
}

function generateRandomText() {
    const count = generateWordCount();
    let messageText = '';
    for (let i = 0; i < count; i++) {
        let position = generateWordNumber();
        messageText += words[position] + ' ';
    }
    return messageText;
}

function generateSpamBotMessage() {
    const newMessage = {
        who: 'Spam Bot',
        text: generateRandomText(),
        time: generateTime()
    }
    
    return newMessage;
}

module.exports = {
    generateSpamBotMessage,
    generateInterval
};
