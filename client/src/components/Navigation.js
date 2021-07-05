import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from './Contact';
import { setMode, setFilter } from '../redux/generalApp';
import { socket } from '../App';

function Navigation() {
    const { users, contacts } = useSelector(state => state);
    const currentUser = localStorage.getItem('currentUser');
    const { mode, filter } = useSelector(state => state.generalApp);
    const currentUserMessages = useSelector((state) => state.contacts[currentUser]);
    const dispatch = useDispatch();


    function setContactsMode(event) {
        const newMode = event.target.id;
        document.querySelector('li.selected').classList.remove('selected');
        document.querySelector(`li#${newMode}`).classList.add('selected');
        dispatch(setMode(newMode));
    }
    let contactsElements;

    function renderContacts() {

        if (Object.keys(contacts).length > 0) {
            let contactsObjects = users.filter((contact) => contact.name !== currentUser);
            if (mode === 'online') {
                contactsObjects = contactsObjects.filter((contact) => contact.status === 'online')
            }

            if (filter.length > 0) {
                contactsObjects = contactsObjects.filter((obj) => obj.name.toLowerCase().includes(filter.toLowerCase()));
            }

            if (contactsObjects.length > 0) {
                return contactsObjects.map((user) => {
                    const allContactMessages = currentUserMessages[user.name].messages;
                    const lastMessage = allContactMessages.length > 0 ? allContactMessages[allContactMessages.length - 1] : undefined;
                    return <Contact key={user.name} user={user} lastMessage={lastMessage} />
                });
            }
            return <div className='no-such-contact'>There is no <em>'{filter}'</em> contact.</div>
        }
        return <div>no contacts</div>
    }

    function handleSearchInputChange({ target }) {
        dispatch(setFilter(target.value));
    }

    useEffect(() => {
        contactsElements = renderContacts()
    }, [users, contacts]);

    contactsElements = renderContacts()

    return (
        <div className='navigation'>
            <nav className='mode'>
                <ul>
                    <li id='online' onClick={setContactsMode}>Online</li>
                    <li id='all' onClick={setContactsMode} className='selected'>All</li>
                </ul>
            </nav>
            <div className='contacts'>
                {contactsElements}
            </div>
            <input
                type='text'
                placeholder='Search...'
                className='search-input'
                onChange={handleSearchInputChange} />
        </div>
    );
}

export default Navigation;