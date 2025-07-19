import React from 'react';

function Header() {
  return (
    <header style={{
      backgroundColor: '#0a192f',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px 0',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '2rem' }}>My Favorite Cities</h1>
    </header>
  );
}

export default Header;
