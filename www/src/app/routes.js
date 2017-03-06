
import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import Bookmarks from './containers/Bookmarks';
import Github from './containers/Github';
import About from './containers/About';

import NavigationBar from './components/NavigationBar';

const routes = () => (
  <div className="header">
    <NavigationBar />
    <Route exact path="/" component={Home} />
    <Route path="/bookmarks" component={Bookmarks} />
    <Route path="/github" component={Github} />
    <Route path="/about" component={About} />
  </div>
);

export default routes;
