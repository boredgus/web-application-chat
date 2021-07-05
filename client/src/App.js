import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import LoadingPage from './components/LoadingPage';
import generateName from './settings/generateName';
import generatePhoto from './settings/generatePhoto';
import { toggleIsLoading } from './redux/generalApp';
import './styles/index.scss';
import eventHandler from './settings/sockets';

const PORT = 'http://localhost:5000/';
export const socket = io(PORT);

function App() {
  const { currentContact, isLoading } = useSelector(state => state.generalApp);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      const newUser = {
        name: generateName(),
        photo: generatePhoto(),
      };

      localStorage.setItem('currentUser', newUser.name);
      socket.emit('add new user', newUser);

      setTimeout(() => {
        dispatch(toggleIsLoading());
      }, 500);
    } else {
      dispatch(toggleIsLoading());
    }

    socket.emit('connected', { who: localStorage.getItem('currentUser') });
  }, []);

  eventHandler(socket, dispatch);

  function handleMenuIconClick() {
    let menuIcon = document.querySelector('.mobile-menu-icon');
    if (menuIcon.classList.contains('open')) {
      menuIcon.classList.remove('open');
    } else {
      menuIcon.classList.add('open');
    }
  }

  return (
    isLoading
      ? <LoadingPage />
      : <div className="App">
        {currentContact ? <Chat /> : <Welcome />}
        <img src='/menu-icon.png' alt='mobile menu icon' className='mobile-menu-icon' onClick={handleMenuIconClick} />
        <Navigation />
      </div>
  );
}

export default App;
