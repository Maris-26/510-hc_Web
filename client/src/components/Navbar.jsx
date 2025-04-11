import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Cocktail Curator
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-links">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-links">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 