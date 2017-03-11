import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const NavigationBar = () => (
  <ul className={styles.navbar}>
    <li className={styles.navitem}><Link to="/">Home</Link></li>
    <li className={styles.navitem}><Link to="/bookmarks">Bookmarks</Link></li>
    <li className={styles.navitem}><Link to="/github">Github</Link></li>
    <li className={styles.navitem}><Link to="/about">About</Link></li>
  </ul>
);

export default NavigationBar;
