import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

import Navbar from './Navbar';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import Login from './Login';
import Signup from './Signup';
import {updateMessages, setMessages} from '../actions/messages';
import {logIn, updateLocation} from '../actions/user';


const App = ({user, messages, logIn, updateMessages, updateLocation, setMessages}) => {
  const socket = io();
  let username;

  const getLocationAndUpdate = (username) =>
    new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
      .then(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // return fetch(`https://vast-tor-38918.herokuapp.com/api/messages/${lat}/${lon}`);
        return fetch(`/api/users/${username}/${lat}/${lon}`, {
          method: 'PUT'
        });
      })
      .then(res => res.text())
      .then(region => {
        updateLocation(region);
        socket.emit('subscribe', region);
        return fetch(`/api/messages/${region}`, {
          method: 'GET'
        });
      })
      .then((response) => {
        console.log('in the room')
        return response.json()
      })
      .then((messages) => {
        console.log('All Messages in the room', messages)
        setMessages(messages)
      })

  const checkUsername = () => {
    if (!username) {
      username = prompt('Actually enter a username.');
      checkUsername();
    } else {
      fetch(`/api/users/${username}`, {method: 'POST'})
        .then(res => {
          if (res.status === 201) {
            logIn(username);
            socket.on('message', message => {
              console.log('In app socket.on.message', message)
              updateMessages(message);
            });
            // socket.on('initialMessages', messages => {
            //   console.log('In app socket.on.initial.messages', messages)
            //   setMessages(messages);
            // });
            getLocationAndUpdate(username);
          } else {
            username = prompt('Unfortunately, that username is taken. Please try another.');
            checkUsername();
          }
        });
    }
  };

  if (user.username === 'anon') {
    username = prompt('Enter a steezy username.');
    checkUsername();
  }

  // <Navbar />
  return (
    <div className="app">
      <Switch>
        <Route exact path='/' render={props => <MessageBoardContainer socket={socket} />} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({user, messages}) => ({
  user,
  messages
});

const mapDispatchToProps = dispatch => ({
  logIn: username => {
    dispatch(logIn(username));
  },
  updateMessages: message => {
    dispatch(updateMessages(message));
  },
  updateInitialMessages: messages => {
    dispatch(updateInitialMessages(messages));
  },
  setMessages: messages => {
    dispatch(setMessages(messages));
  },
  updateLocation: location => {
    dispatch(updateLocation(location));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
