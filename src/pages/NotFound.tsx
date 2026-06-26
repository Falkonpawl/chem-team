import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
