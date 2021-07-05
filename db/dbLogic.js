const fs = require('fs');
const dbPath = './db/database.json';

function parseStreamToString() {
    const readStream = fs.createReadStream(dbPath, "utf8");
    const chunks = [];

    return new Promise((resolve, reject) => {
        readStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        readStream.on('error', (err) => reject(err));
        readStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

let previousData;

async function getAllData() {
    let result;
    await parseStreamToString()
        .then((data) => {
            if (data.length > 0) {
                previousData = data;
            }
            result = JSON.parse(previousData);
        })
        .catch((err) => {
            throw new Error(err);
        });

    return result;
}

function addMessage(state, from, to, message) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
    newState.users.status = 'online';
    let contacts = [from, to];
    contacts.forEach((contact, index) => {
        if (!contact.includes('Bot')) {
            newState.contacts[contact][contacts[(index + 1) % 2]].messages.push(message);
        }
    });

    const writeStream = fs.createWriteStream(dbPath);
    writeStream.write(JSON.stringify(newState));
}

function initializeContacts(state, contacts, newUserName) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
    const initialContactPattern = {
        isTyping: false,
        messages: []
    }

    Object.keys(newState.contacts).forEach((contact) => {
        if (!contact.includes('Bot')) {
            newState.contacts[contact][newUserName] = initialContactPattern;
        }
    });

    newState.contacts[newUserName] = {};
    contacts.forEach((contact) => {
        newState.contacts[newUserName][contact] = initialContactPattern;
    });

    return newState;
}

function addNewUser(state, name, photo) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);

    let contacts = [];
    newState.users.forEach((user) => {
        contacts.push(user.name);
    });
    newState = initializeContacts(newState, contacts, name);

    const newUser = {
        name,
        photo,
        status: 'online',
        isLoading: true,
        connection_id: null
    };
    newState.users.unshift(newUser);

    const writeStream = fs.createWriteStream(dbPath);
    writeStream.write(JSON.stringify(newState));
}

function userConnect({ state, who, connection_id }) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
    newState.users.find((user) => user.name === who).status = 'online';
    newState.users.find((user) => user.name === who).connection_id = connection_id;

    const writeStream = fs.createWriteStream(dbPath);
    writeStream.write(JSON.stringify(newState));
}

function userDisconnect({ state, connection_id }) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
    newState.users.find((user) => user.connection_id === connection_id).status = 'offline';

    console.log('> disconnected ', newState.users.find((user) => user.connection_id === connection_id).name);

    const writeStream = fs.createWriteStream(dbPath);
    writeStream.write(JSON.stringify(newState));
}

function toggleIsLoading(state, who) {
    let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
    newState.users.find((user) => user.name === who).isLoading = false;

    const writeStream = fs.createWriteStream(dbPath);
    writeStream.write(JSON.stringify(newState));
}

module.exports = {
    getAllData,
    addMessage,
    addNewUser,
    userConnect,
    toggleIsLoading,
    userDisconnect,
}
