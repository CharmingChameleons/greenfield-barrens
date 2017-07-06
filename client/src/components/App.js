import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import Login from './Login';
import Signup from './Signup';
import {updateMessages} from '../actions/messages';
import {logIn, updateLocation} from '../actions/user';


const App = ({user, logIn, updateMessages, updateLocation}) => {
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
      });

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
              updateMessages(message);
            });
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
        <Route exact path="/" render={props => <MessageBoardContainer socket={socket}/>}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  logIn: username => {
    dispatch(logIn(username));
  },
  updateMessages: message => {
    dispatch(updateMessages(message));
  },
  updateLocation: location => {
    dispatch(updateLocation(location));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
