import React from 'react';

function NoMessages({ currentContact }) {
    return (
        <div className='no-messages'>
            You have no messages with <strong>{currentContact}</strong>. Write something to him!
        </div>
    )
}

export default NoMessages;