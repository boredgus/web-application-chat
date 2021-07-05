import { setUsersState } from '../redux/users';
import { setMessagesState } from '../redux/messages';

const eventHandler = (socket, dispatch) => {
    socket.on('update messages', ({ messages }) => {
        dispatch(setMessagesState(messages));
    });

    socket.on('update users', ({ users }) => {
        dispatch(setUsersState(users));
    });
}
export default eventHandler;