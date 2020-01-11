import React, { useState, useEffect } from "react";
import "./App.css";

import NavBar from "./NavBar_v3.js";
import HomePage from "./HomePage.js";
import VideoPlayer from "./VideoPlayer.js";
import TeamPage from "./TeamPage.js";
import PlayerPage from "./PlayerPage.js";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Chart from "./Chart.js";
import TryProcessingPage from "./TryProcessingPage.js";
import MatchesPage from "./MatchesPage.js";
import TriesPage from "./TriesPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import config from "react-global-configuration";

config.set({
  backend_url:
    window.location.hostname == "localhost"
      ? "http://127.0.0.1:8000/"
      : "https://rhysmaiden.pythonanywhere.com/"
});

const App = () => {
  const [credentials, setCredentials] = useState("");

  useEffect(() => {
    // document.title = "The Rugby Vault";
    getCredentials();
  }, []);

  function getCredentials() {
    const googleId = localStorage.getItem("googleId");

    if (googleId == "undefined") {
      setCredentials("");
      return;
    } else {
      setCredentials(googleId);
    }
  }

  const responseGoogle = response => {};

  const login = response => {
    setCredentials(response.googleId);
    localStorage.setItem("googleId", response.googleId);
  };

  const logout = response => {
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
          <Route path="/matches" component={MatchesPage} />
          <Route path="/tries" component={TriesPage} />
        </Router>
      </div>
    </React.Fragment>
  );
};

export default App;
