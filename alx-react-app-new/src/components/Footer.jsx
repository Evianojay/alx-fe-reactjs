import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a192f',
      color: '#ffffff',
      textAlign: 'center',
      padding: '16px 0',
      marginTop: '40px',
      fontSize: '0.9rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} My Favorite Cities. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
