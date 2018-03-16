import React from 'react';

function Header(props) {
  return (
    <header className="site-header">
      { props.children }
    </header>
  );
}

export default Header;
