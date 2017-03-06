import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NavigationBar = () => (
  <ul className="navbar">
    <li className="navitem"><Link to="/">Home</Link></li>
    <li className="navitem"><Link to="/bookmarks">Bookmarks</Link></li>
    <li className="navitem"><Link to="/github">Github</Link></li>
    <li className="navitem"><Link to="/about">About</Link></li>
  </ul>
);

export default NavigationBar;
