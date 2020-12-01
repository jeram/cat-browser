import React from 'react';
import Home from './Home';
import SingleCat from './SingleCat';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  export default function App() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/:catId">
                <SingleCat />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
}
