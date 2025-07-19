import React from 'react';

function MainContent() {
  return (
    <main style={{
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>About the Cities</h2>
      <p>
        Explore a curated list of the most beautiful and vibrant cities around the world. Discover what makes each one unique and worth visiting.
      </p>
    </main>
  );
}

export default MainContent;
