import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="site-header">
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/star-wars">Star Wars</Link></li>
        </ul>
      </nav>

      <nav className="account-nav">
        <ul>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
