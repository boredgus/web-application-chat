import React from 'react';

function LoadingPage() {
    return (
        <div className='loading-page'>
            <div className='gif-container'>
                <img src='/loading.gif' alt='loading gif' />
                <h1>wait a moment...</h1>
            </div>
        </div>
    );
}

export default LoadingPage;