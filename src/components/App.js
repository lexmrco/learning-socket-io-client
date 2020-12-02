import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import socket from '../socket';
import Header from './Header';
import AutomaticMessages from './AutomaticMessages';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import NicknameForm from './NicknameForm';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  chat: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '600px',
    padding: '10px'
  },
  login: {
    width: '400px',
    height: '600px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  }
}));

function App() {
  const classes = useStyles();
  const initialUserState = {
    id: null,
    nickname: null
  };
  const [user, setUser] = useState(initialUserState);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.on('message', data => {
      console.log('Llegó mensaje...');
      console.log(data);
      setMessages([...messages, data]);
    });

    socket.on('login', ({ activeUsers, user }) => {
      console.log('Login');
      console.log(user);
      setUser(user);
      setActiveUsers(activeUsers);
    });

    socket.on('new user', ({ activeUsers, user }) => {
      const newMessage = {
        body: `${user.nickname} se ha unido`,
        date: new Date(),
        type: 'notification',
        user
      };
      setActiveUsers(activeUsers);
      setMessages([...messages, newMessage]);
    });

    socket.on('left', ({ activeUsers, user }) => {
      if (user) {
        const newMessage = {
          body: `${user.nickname} ha salido`,
          date: new Date(),
          type: 'notification',
          user
        };
        setMessages([...messages, newMessage]);
      }
      setActiveUsers(activeUsers);
    });

    return () => {
      socket.off('left');
      socket.off('login');
      socket.off('message');
      socket.off('new user');
    };
  }, [messages, user, activeUsers]);

  const handleSendMessage = (message, type) => {
    console.log('handleSendMessage')
    console.log(type)
    const newMessage = { id: uuidv4(), body: message, date: new Date(), type: type, user };
    setMessages([...messages, newMessage]);
    socket.emit('message', newMessage);
  };

  const handleSetNickname = nickname => {
    const newUser = { ...user, nickname };
    setUser(newUser);
    console.log('handleSetNickname');
    console.log(newUser);
    socket.emit('join', newUser);
  };

  if (!user.id) {
    return (
      <Paper className={classes.login}>
        <Header
          mainText="Inicio de sesión"
      />
        <NicknameForm className={classes.login} sendNickname={handleSetNickname} />
      </Paper>
    );
  }

  return (
    <Paper className={classes.chat}>
      <Header
        mainText="Notificador de mensajes"
        secondaryText={`${activeUsers} ${activeUsers !== 1 ? 'usuarios' : 'usuario'}`}
      />
      <MessageList messages={messages} currentUser={user} />
      <MessageForm sendMessage={handleSendMessage} />
      <AutomaticMessages sendMessage={handleSendMessage} />
    </Paper>
  );
}

export default App;
