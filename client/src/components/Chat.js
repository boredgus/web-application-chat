import React from 'react';
import { useSelector } from "react-redux";
import ContactInfo from './ContactInfo';
import Messages from './Messages';
import ChatActions from './ChatActions';
import NoMessages from './NoMessages';

function Chat() {
    const { currentContact } = useSelector((state) => state.generalApp);
    const {contacts} = useSelector((state) => state);
    const  messages = contacts[localStorage.getItem('currentUser')][currentContact].messages;
    
    return (
        <div className='chat'>
            <ContactInfo />
            {messages.length > 0 ? <Messages /> : <NoMessages currentContact={currentContact} />}
            <ChatActions />
        </div>
    );
}

export default Chat;