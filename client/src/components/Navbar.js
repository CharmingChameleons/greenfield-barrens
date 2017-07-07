import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODOS:
    use react-router for links
*/

const Navbar = ({user, changePage}) => {
  return (
    <div className="ui three item menu">
      <a className="item" onClick={ function() {changePage()} } > β </a>
      <a className="item">{user.region}</a>
      <a className="item">{user.username}</a>
    </div>
  );
};

export default Navbar;
