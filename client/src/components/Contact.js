import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentContact } from '../redux/generalApp';

function Contact({ user, lastMessage }) {
    const dispatch = useDispatch();

    function selectContact(event) {
        if (document.querySelector('.contact.selected')) {
            document.querySelector('.contact.selected').classList.remove('selected');
        }

        let contact = event.target;
        while (contact.className !== 'contact') {
            contact = contact.parentElement;
        }
        contact.classList.add('selected');
        dispatch(setCurrentContact(contact.id));

        document.querySelector('.mobile-menu-icon').classList.remove('open');
    }

    const lastMessageText = lastMessage === undefined ? <em>Start chatting!</em> :
        (lastMessage.text.length > 60 ? lastMessage.text.substring(0, 60) + '...' : lastMessage.text);

    return (<div className='contact' id={user.name} onClick={selectContact}>
        <div className='icon-container'>
            <img src={user.photo} alt={user.name} className='icon' />
            <div className='status-badge' style={user.status === 'online' ? { display: 'block' } : { display: 'none' }}></div>
        </div>
        <div className='short-info'>
            <h4 className='name'>{user.name}</h4>
            <p className='last-message'>{lastMessageText}</p>
        </div>
    </div>)
}

export default Contact;