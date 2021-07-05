import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ContactInfo() {
    const { users } = useSelector(state => state);
    const { currentContact } = useSelector(state => state.generalApp);
    const curContactInfo = users.find(user => user.name === currentContact);


    useEffect(() => {
        contactStatusElement = renderContactStatus();
    }, [users]);

    let contactStatusElement;

    function renderContactStatus() {
        return (
            <div className='status-container'>
                <div className={`status-badge ${curContactInfo.status}`}></div>
                <div className='status'>{curContactInfo.status}</div>
            </div>
        );
    }
    
    contactStatusElement = renderContactStatus();

    return (
        <div className='contact-info'>
            <img src={curContactInfo.photo} alt={curContactInfo.name} className='icon' />
            <div className='info'>
                <h1>{curContactInfo.name}</h1>
                {contactStatusElement}
                {curContactInfo.description ? <p className='description'>{curContactInfo.description}</p> : null}
            </div>
        </div>
    );
}

export default ContactInfo;