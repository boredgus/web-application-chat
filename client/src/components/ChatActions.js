import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage } from '../redux/messages';
import generateTime from '../settings/generateTime';
import { socket } from '../App';

function ChatActions() {
    const { currentContact } = useSelector(state => state.generalApp);
    const currentUser = localStorage.getItem('currentUser');
    const { contacts } = useSelector((state) => state)
    const { isTyping } = contacts[currentUser][currentContact];
    const dispatch = useDispatch();
    const inputRefference = useRef(null);

    function createNewMessage(who, text) {
        return {
            who,
            text,
            time: generateTime()
        }
    }

    function handleSubmitEvent(event) {
        if (event.type === 'submit' || event.key === 'Enter') {
            event.preventDefault();

            const input = document.querySelector('.message-input');
            const text = input.value;

            if (text.replace(/\s+/g, '').length === 0) {
                let errorMessageBlock = document.querySelector('.error-message');
                errorMessageBlock.style.display = 'block';
                setTimeout(() => errorMessageBlock.style.display = 'none', 3000);
                inputRefference.current.focus();
                return;
            }
            const message = createNewMessage(currentUser, text);

            dispatch(addNewMessage(currentUser, currentContact, message));
            socket.emit('message', { from: currentUser, to: currentContact, message });

            input.value = '';
            inputRefference.current.focus();
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (document.querySelector('.messages')) {
                const messagesContainer = document.querySelector('.messages');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            inputRefference.current.focus();
        }, 500);
    }, [currentContact])

    return (
        <div className='chat-actions'>
            <div className={`isTyping ${isTyping ? 'yes' : ''}`}>{currentContact} is typing...</div>
            <div className='error-message'>Message cannot be empty or only containing spaces.</div>
            <form onSubmit={handleSubmitEvent}>
                <input type='text' placeholder='Start chatting!' className='message-input' onKeyDown={handleSubmitEvent} ref={inputRefference} />
                <input type='submit' value='Send message' className='submit-input' />
            </form>
        </div>
    );
}

export default ChatActions;