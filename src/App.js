import React from 'react';
import './App.css';
import PrototypeComponent from "./components/PrototypeComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={"container"}>
          <Route
              path={"/"}
              exact={true}
              component={PrototypeComponent}/>
          <Route
              path={"/result/:imdbID"}
              exact={true}
              component={ResultInfoComponent}/>
      </div>
  </Router>
  );
}

export default App;
