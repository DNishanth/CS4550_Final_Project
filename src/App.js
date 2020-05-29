import React from 'react';
import './App.css';
import PrototypeComponent from "./components/PrototypeComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={"container"}>
        <Route
          path={"/"}
          exact={true}
          component={PrototypeComponent}/>
        <Route
          path={"/result/:imdb_id"}
          exact={true}
          component={ResultInfoComponent}/>
      </div>
  </Router>
  );
}

export default App;
