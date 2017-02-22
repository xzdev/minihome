import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from './containers/Home';
import Bookmarks from './containers/Bookmarks';
import Github from './containers/Github';
import About from './containers/About';

const App = () => (
  <Router>
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
  </Router>
);

export default App;
