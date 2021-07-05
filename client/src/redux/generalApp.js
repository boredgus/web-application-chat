export function setGeneralAppState(state) {
    return {
        type: 'SET_GENERAL_APP_STATE',
        state
    }
}

export function setCurrentContact(name) {
    return {
        type: 'SET_CURRENT_CONTACT',
        name
    }
}

export function setMode(mode) {
    return {
        type: 'SET_MODE',
        mode
    }
}

export function toggleIsLoading() {
    return {
        type: 'TOGGLE_IS_LOADING',
    }
}

export function setFilter(filter) {
    return {
        type: 'SET_FILTER', 
        filter
    }
}

const initialState = {
    currentContact: null,
    mode: 'all',
    filter: '',
    isLoading: true
};

export default function generalAppReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GENERAL_APP_STATE':
            return action.state;
        case 'SET_CURRENT_CONTACT':
            console.log('> set current contact: ', action.name);

            return {
                ...state,
                currentContact: action.name
            }
        case 'SET_MODE':
            console.log('> set mode: ', action.mode);

            return {
                ...state,
                mode: action.mode
            }
        case 'TOGGLE_IS_LOADING':
            console.log('> toggle isLoading')
            return {
                ...state,
                isLoading: false
            }
        case 'SET_FILTER':
            console.log('> set filter:', action.filter)
            return {
                ...state, 
                filter: action.filter
            }
        default:
            return state;
    }
}