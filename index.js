const app = require('express')();
const http = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(http, {
    cors: '*'
});

const {
    getAllData,
    userConnect,
    userDisconnect,
    addNewUser,
    addMessage,
} = require('./db/dbLogic');
const { generateSpamBotMessage, generateInterval } = require('./helpers/spamBotHelper');

io.on('connection', async (socket) => {

    await socket.on('connected', async ({ who }) => {
        console.log('> connected:', who, socket.id);

        let state = await getAllData();
        userConnect({ state, who, connection_id: socket.id })

        let updatedState = await getAllData();
        io.emit('update users', { users: updatedState.users });

        let sendSpamBotMessage = async function (to) {
            let state = await getAllData();
            addMessage(state, 'Spam Bot', to, generateSpamBotMessage());

            let updatedState2 = await getAllData();
            socket.emit('update messages', { messages: updatedState2.contacts });

            setTimeout(() => sendSpamBotMessage(to), generateInterval());
        }
        await sendSpamBotMessage(who);
    });

    await socket.on('disconnect', async (reason) => {
        if (reason === 'transport close') {
            let state = await getAllData();
            userDisconnect({ state, connection_id: socket.id })

            let updatedState = await getAllData();
            io.emit('update users', { users: updatedState.users, where: 'index/message' });
        }
    })

    await socket.on('add new user', async ({ name, photo }) => {
        console.log('> add new user', name);
        let state = await getAllData();
        addNewUser(state, name, photo);

        let updatedState = await getAllData();
        socket.emit('update users', { users: updatedState.users, where: 'index/add new user' });
        socket.emit('update messages', { messages: updatedState.contacts, where: 'index/add new user' });
    });

    await socket.on('message', async ({ from, to, message }) => {
        console.log(`> '${from}' sent message to '${to}': `, message);

        let state = await getAllData();
        await addMessage(state, from, to, message);

        let updatedState1 = await getAllData();
        io.emit('update users', { users: updatedState1.users, where: 'index/message' });
        io.emit('update messages', { messages: updatedState1.contacts, where: 'index/message' });

        if (to === 'Echo Bot' || to === 'Reverse Bot') {
            let updatedState2 = await getAllData();
            if (to === 'Echo Bot') {
                let newMessage1 = {
                    who: 'Echo Bot',
                    text: message.text,
                    time: message.time
                }
                console.log(`> '${to}' sent message to '${from}': `, newMessage1);
                await addMessage(updatedState2, to, from, newMessage1);

                let updatedState3 = await getAllData();
                socket.emit('update messages', { messages: updatedState3.contacts, where: 'index/message bot' });

            } else if (to === 'Reverse Bot') {
                let newMessage2 = {
                    who: 'Reverse Bot',
                    text: message.text.split("").reverse().join(""),
                    time: message.time
                }
                setTimeout(async () => {
                    console.log(`> '${to}' sent message to '${from}': `, newMessage2);
                    await addMessage(updatedState2, to, from, newMessage2);
                    let updatedState3 = await getAllData();
                    socket.emit('update messages', { messages: updatedState3.contacts, where: 'index/message bot' });
                }, 3000);
            }

        }
    });

    await socket.on('update state', async () => {
        let updatedState = await getAllData();

        socket.emit('update users', { users: updatedState.users, where: 'index/update state' });
        socket.emit('update messages', { messages: updatedState.contacts, where: 'index/update state' });
    });
});

app.use('/', require('express').static('./client/build'));

http.listen(PORT, () => console.log(`listening on  http://localhost:5000/...`));
