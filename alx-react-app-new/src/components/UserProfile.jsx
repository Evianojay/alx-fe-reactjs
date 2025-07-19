import React from 'react';

function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px auto',
      maxWidth: '600px',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '8px' }}>{props.name}</h2>
      <p style={{ margin: '4px 0', color: '#333' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ margin: '4px 0', color: '#555' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;
