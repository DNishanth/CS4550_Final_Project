import React from 'react';
import './App.css';
import SearchComponent from "./components/SearchComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfileComponent from "./containers/ProfileComponent";
import NavBarComponent from "./components/NavBarComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProfileComponentTemp from "./components/ProfileComponentTemp";


function App() {
  return (
    <Router>
      <div className={"container"}>
        <NavBarComponent />
        <Route
          path={"/"}
          exact={true}
          component={SearchComponent} />
        <Route
          path={"/result/:imdb_id"}
          exact={true}
          component={ResultInfoComponent} />
        <Route
          path={"/profile/:layout"}
          exact={true}
          component={ProfileComponent} />
        <Route
          path={"/profile/:layout/:view"}
          exact={true}
          component={ProfileComponent} />
        <Route
          path={"/profile/:layout/:view/:showId"}
          exact={true}
          component={ProfileComponent} />
        <Route
          path={"/login"}
          exact={true}
          component={LoginComponent} />
        <Route
          path={"/registration"}
          exact={true}
          component={RegisterComponent} />
        <Route
          path={"/profile"}
          exact={true}
          component={ProfileComponentTemp} />
      </div>
    </Router>
  );
}

export default App;
