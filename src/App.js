// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to WATCHSY</h1>
        <p>Stream your favorite movies and shows anytime, anywhere.</p>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </header>
      <footer className="landing-footer">
        <p>&copy; 2024 WATCHSY. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
