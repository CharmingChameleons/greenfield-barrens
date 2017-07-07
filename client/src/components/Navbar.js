import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODOS:
    use react-router for links
*/

const Navbar = ({user, openChannels, openRegions}) => {
  return (
    <div className="ui three item menu">
      <a className="item" onClick={ function() {openChannels()} } > β </a>
      <a className="item" onClick={ function() {openRegions()} }>{user.region}</a>
      <a href="/auth/facebook" className="item">{user.username}</a>
    </div>
  );
};

export default Navbar;
