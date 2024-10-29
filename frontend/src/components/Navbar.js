import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="nav-content">
        <div className="logo">Agile To-Do</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;