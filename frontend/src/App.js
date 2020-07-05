import React from 'react';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from "./components/Home";
import Search from "./components/Search";

function App() {

  // order matters for the router, path searched from top to bottom

  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        {/*
        <Route path="/history">
          <History />
        </Route>
        <Route>
          <Home />
        </Route>
        */}
      </Switch>
    </Router>
  );
}

export default App;
