import React from 'react';
import './App.css';
import SearchComponent from "./components/SearchComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import {BrowserRouter as Router, Route} from "react-router-dom";
import ProfileComponent from "./containers/ProfileComponent";
import NavBarComponent from "./components/NavBarComponent";

function App() {
  return (
    <Router>
      <div className={"container"}>
          <NavBarComponent/>
          <Route
              path={"/"}
              exact={true}
              component={SearchComponent}/>
              <Route
              path={"/result/:imdb_id"}
              exact={true}
              component={ResultInfoComponent}/>
            <Route
              path={"/profile/:layout"}
              exact={true}
              component={ProfileComponent}/>
          <Route
              path={"/profile/:layout/:view"}
              exact={true}
              component={ProfileComponent}/>
        <Route
          path={"/profile/:layout/:view/:showId"}
          exact={true}
          component={ProfileComponent}/>
      </div>
  </Router>
  );
}

export default App;
