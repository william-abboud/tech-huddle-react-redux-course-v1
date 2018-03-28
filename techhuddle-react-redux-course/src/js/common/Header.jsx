import React from 'react';

function Header(props) {
  return (
    <header className="site-header">
      <nav className="main-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Books</a></li>
        </ul>
      </nav>

      <nav className="account-nav">
        <ul>
          <li><a href="#">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
