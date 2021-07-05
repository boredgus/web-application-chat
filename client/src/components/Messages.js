import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import { socket } from '../App';

function Messages() {
    const currentUser = localStorage.getItem('currentUser');
    const { currentContact } = useSelector((state) => state.generalApp);
    const { contacts } = useSelector((state) => state);

    let messagesElements;

    function renderMessages() {
        const { messages } = contacts[currentUser][currentContact];
        return messages.map((message, index) => <Message key={index} message={message} currentUser={currentUser} />);
    }
    useEffect(() => {
        messagesElements = renderMessages();

        let messagesBlock = document.querySelector('.messages')
        messagesBlock.scroll({ top: messagesBlock.scrollHeight, behavior: 'smooth' });
    }, [contacts]);

    messagesElements = renderMessages();
    
    return (
        <div className='messages'>
            {messagesElements}
        </div>
    );
}

export default Messages;