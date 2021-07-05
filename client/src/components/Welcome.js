import React from 'react';

function Welcome() {
    return (
        <div className='welcome'>
            <h1>
                <em>{localStorage.getItem('currentUser')}</em>,
                <br />
                welcome to chat!
            </h1>
            <h3>Choose any contact to start conversation.</h3>
        </div>
    )
}

export default Welcome;