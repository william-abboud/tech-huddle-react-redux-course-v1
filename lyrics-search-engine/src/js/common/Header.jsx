import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="site-header">
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
