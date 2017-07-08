import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODOS:
    use react-router for links
*/

const Navbar = ({user, openChannels, openRegions}) => {
  var el;

  if (user.username === 'Login') {
    el = 
      <div className="ui three item menu">
        <a className="item"> βarrens v2 </a>
        <a className="item">  </a>
        <a href="/auth/facebook" className="item">Login</a>
      </div>

  } else {
    el = 
      <div className="ui three item menu">
        <a className="item" onClick={ function() {openChannels()} } > Channels </a>
        <a className="item" onClick={ function() {openRegions()} }>{user.region}</a>
        <a href="/logout" className="item">{user.username}</a>
      </div>
  }

  return (
    <div>
      {el}
    </div>
  );
};

export default Navbar;
