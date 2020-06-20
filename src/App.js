import React from 'react';
import './App.css';
import SearchComponent from "./components/SearchComponent";
import ResultInfoComponent from './components/ResultInfoComponent';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import NavBarComponent from "./components/NavBarComponent";
import ProfileSettingsComponent from "./components/ProfileSettingsComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import DiscussionBoardComponent from "./components/DiscussionBoardComponent";
import HomePageComponent from "./components/HomePageComponent";
import GroupComponent from "./components/GroupComponent";


function App() {
  return (
    <Router>
      <div className={"container"}>
        <NavBarComponent />
        <Route
          path={"/"}
          exact={true}
          component={HomePageComponent} />
        <Route
          path={"/search"}
          exact={true}
          component={SearchComponent} />
        <Route
          path={"/search/:query"}
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
          path={"/profile/:layout/:showId"}
          exact={true}
          component={ProfileComponent} />
        <Route
          path={"/profile/info"}
          exact={true}
          component={ProfileSettingsComponent} />
        <Route
          path={"/login"}
          exact={true}
          component={LoginComponent} />
        <Route
          path={"/registration"}
          exact={true}
          component={RegisterComponent} />
        <Route
          path={"/discussions/:discId"}
          exact render={({ match }) => <DiscussionBoardComponent match={match} />} />
        <Route
          path={"/groups/:groupId"}
          exact={true}
          component={GroupComponent} />
      </div>
    </Router>
  );
}

export default App;
