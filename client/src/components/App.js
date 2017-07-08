import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

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
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        lat = 51.5085
        lon = -0.1257 
        // return fetch(`https://vast-tor-38918.herokuapp.com/api/messages/${lat}/${lon}`);
        return fetch(`/api/users/${username}/${lat}/${lon}`, {
          method: 'PUT'
        });
      })
      .then(res => {
        return res.text()
      })
      .then(txt => {
        var info = JSON.parse(txt)
        updateLocation(info);
        socket.emit('subscribe', info.region);
        return fetch(`/api/messages/${info.region}`, {
          method: 'GET'
        });
      })
      .then((response) => {
        console.log('in the room')
        return response.json()
      })
      .then((messages) => {
        setMessages(messages)
      })

  const checkUsername = () => {
    fetch(`/api/users/${username}`, {method: 'POST'})
      .then(res => {
        if (res.status === 201) {
          logIn(username);
          socket.on('message', message => {
            updateMessages(message);
            getLocationAndUpdate(username);

          });
        } else{
            logIn(username);
            socket.on('message', message => {
              updateMessages(message);
            });
          getLocationAndUpdate(username);
        }
      });

  };

  if (user.username === null) {

    logIn('Login');
    $.get( "/usertest", function( data ) {
      if (data) {
        username = data;
        logIn(username);
        getLocationAndUpdate(username);
        checkUsername();
      }
    });
        //checkUsername();
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
  updateLocation: info => {
    dispatch(updateLocation(info));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
