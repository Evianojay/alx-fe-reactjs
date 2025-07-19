import { Link } from "react-router-dom";

const navbarStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '10px 0',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginRight: '2rem',
};

const navListStyle = {
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: '500',
  transition: 'color 0.3s ease',
};

export default function Navbar() {
  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>My Company</div>
        <ul style={navListStyle}>
          <li><Link style={linkStyle} to="/">Home</Link></li>
          <li><Link style={linkStyle} to="/about">About Us</Link></li>
          <li><Link style={linkStyle} to="/services">Our Services</Link></li>
          <li><Link style={linkStyle} to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
}
