import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { isLoggedIn } from '../utils/utils';
import anonymous from '../../assets/images/anonymous-profile.jpg';

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
        {
          isLoggedIn
            ?
              <Avatar firstName="John" lastName="Doe" imageSrc={anonymous} />
            :
            <ul>
              <li><Link to="/register">Register</Link></li>
            </ul>
        }

      </nav>
    </header>
  );
}

export default Header;
