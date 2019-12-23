import React, { useState, useEffect } from "react";
import "./App.css";

import NavBar from "./NavBar_v2.js";
import SearchBar from "./Search.js";
import MainPlayer from "./MainPlayer.js";
import VideoGrid from "./VideoGrid.js";
import PageNav from "./PageNav.js";
import HomePage from "./HomePage.js";
import VideoPlayer from "./VideoPlayer.js";
import TeamPage from "./TeamPage.js";
import PlayerPage from "./PlayerPage.js";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Chart from "./Chart.js";
import Rating from "react-rating";
import TryProcessingPage from "./TryProcessingPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import config from "react-global-configuration";


config.set({
  backend_url:
    window.location.hostname == "localhost"
      ? "http://127.0.0.1:8000/"
      : "http://127.0.0.1:8000/"
});

const App = () => {
  const [credentials, setCredentials] = useState("");

  useEffect(() => {
    getCredentials();
  }, []);

  function getCredentials() {
    const googleId = localStorage.getItem("googleId");
    console.log("Getting credntials...");
    console.log(typeof googleId);

    console.log("#" + googleId);

    if (googleId == "undefined") {
      console.log("No credentials");
      setCredentials("");
      return;
    } else {
      console.log("Found credentialss");
      setCredentials(googleId);
    }
  }

  const responseGoogle = response => {};

  const login = response => {
    console.log(response);
    setCredentials(response.googleId);
    localStorage.setItem("googleId", response.googleId);
  };

  const logout = response => {
    console.log(response);
    setCredentials("");
    localStorage.setItem("googleId", undefined);
  };

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
      />
      <NavBar login={login} logout={logout} credentials={credentials} />
      <div className="App">
        <MainPlayer />

        <Router>
          <Route exact path="/" component={() => <HomePage />} />
          <Route
            path="/video/:type?/:id?"
            render={routeParams => (
              <VideoPlayer routeParams={routeParams} googleId={credentials} />
            )}
          />
          <Route path="/team/:id?" component={TeamPage} />
          <Route path="/player/:id?" component={PlayerPage} />
          <Route path="/chart/:type?" component={Chart} />
          <Route path="/tryprocessing/:id?" component={TryProcessingPage} />
          {/* <Route path="/player/:show_id?/:episode_id?" component={Player} /> */}
        </Router>

        <PageNav />
      </div>
    </React.Fragment>
  );
};

export default App;
