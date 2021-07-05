export function setMessagesState(state) {
    return {
        type: 'SET_MESSAGES_STATE',
        state
    }
}

export function addNewContact() {
    return {
        type: 'ADD_NEW_CONTACT',

    }
}

export function addNewMessage(from, to, newMessage) {
    return {
        type: 'ADD_NEW_MESSAGE',
        from,
        to,
        newMessage
    }
}

export default function messagesReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_MESSAGES_STATE':
            return action.state;

        case 'ADD_NEW_CONTACT':
            console.log('> add new contact');
            return {
                ...state
            }

        case 'ADD_NEW_MESSAGE':
            console.log('> add new message');
            console.log('action ', action)

            let newState = state;
            let contacts = [action.from, action.to];
            contacts.forEach((contact, index) => {
                if (!contact.includes('Bot')) {
                    newState[contact][contacts[(index + 1) % 2]].messages.push(action.newMessage);
                }
            });
            return newState;

        default:
            return state;
    }
}