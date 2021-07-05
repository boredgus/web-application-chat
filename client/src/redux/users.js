export function setUsersState(state) {
    return {
        type: 'SET_USERS_STATE',
        state
    }
}

export function addNewUser({ name, photo }) {
    return {
        type: 'ADD_NEW_USER',
        name,
        photo
    }
}

export function changeUserStatus(name, status) {
    return {
        type: 'CHANGE_USER_STATUS',
        name,
        status
    }
}

function setNewUserMessages(allUsers) {
    let contacts = allUsers.map(user => user.name);
    let newUserMessages = {};

    contacts.forEach(contact => {
        newUserMessages[contact] = [];
    });

    return newUserMessages;
}

export default function usersReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_USERS_STATE':
            return action.state;
        case 'ADD_NEW_USER':
            return [
                ...state,
                {
                    name: action.name,
                    photo: action.photo,
                    status: 'online',
                    messages: setNewUserMessages(state)
                }
            ];
        case 'CHANGE_USER_STATUS':
            return state.map((user) => {
                user.status = user.name === action.name ? action.status : user.status;
                return user;
            });
        default:
            return state;
    }
}