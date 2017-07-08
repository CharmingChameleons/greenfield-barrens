import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODOS:
    use react-router for links
*/

const Navbar = ({user, openChannels, openRegions}) => {
  var el;

  if (user.username === 'Login') {
    el = <a href="/auth/facebook" className="item">{user.username}</a>
  } else {
    el = <a href="/logout" className="item">{user.username}</a>
  }


  return (
    <div className="ui three item menu">
      <a className="item" onClick={ function() {openChannels()} } > β </a>
      <a className="item" onClick={ function() {openRegions()} }>{user.region}</a>
      {el}
    </div>
  );
};

export default Navbar;
