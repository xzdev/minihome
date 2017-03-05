
import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './containers/Home';
import Bookmarks from './containers/Bookmarks';
import Github from './containers/Github';
import About from './containers/About';

const routes = () => (
  <div className="header">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/bookmarks">Bookmarks</Link></li>
      <li><Link to="/github">Github</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <Route exact path="/" component={Home} />
    <Route path="/bookmarks" component={Bookmarks} />
    <Route path="/github" component={Github} />
    <Route path="/about" component={About} />
  </div>
);

export default routes;
