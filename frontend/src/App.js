import React from 'react';
import './css/App.css';

/*
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
*/

import Home from "./components/Home";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './reducers/index.js';

const store = createStore(Reducer);

function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>

    /* multi page solution
    // order matters for the router, path searched from top to bottom
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
    */
  );
}

export default App;
