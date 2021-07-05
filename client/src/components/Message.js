import React from 'react';

function Message({ message, currentUser }) {
    return (
        <div className={`message ${message.who === currentUser ? 'me' : ''}`}>
            <div className='message-header'>
                <span className='username'>{message.who}</span>
                <span className='time'>{message.time}</span>
            </div>
            <div className='message-body'>
                {message.text}
            </div>
        </div>
    )
}

export default Message;