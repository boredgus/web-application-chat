import { combineReducers, createStore } from "redux";

import users from "./users";
import contacts from './messages';
import generalApp from "./generalApp";

const rootReducer = combineReducers({
    users,
    contacts,
    generalApp
})

const store = createStore(rootReducer);
store.subscribe(() => { });

export default store;