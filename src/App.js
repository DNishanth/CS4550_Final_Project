import React from 'react';
import './App.css';
import PrototypeComponent from "./components/PrototypeComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import {BrowserRouter as Router, Route} from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import NavBarComponent from "./components/NavBarComponent";

function App() {
  return (
    <Router>
      <div className={"container"}>
          <NavBarComponent/>
          <Route
          path={"/"}
          exact={true}
          component={PrototypeComponent}/>
        <Route
          path={"/result/:imdb_id"}
          exact={true}
          component={ResultInfoComponent}/>
        <Route
          path={"/profile"}
          // exact={true}
          component={ProfileComponent}/>
      </div>
  </Router>
  );
}

export default App;
