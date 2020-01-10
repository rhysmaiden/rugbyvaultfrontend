import React, { useEffect, useState } from "react";
import "./App.css";
import { teams_in_leagues } from "./league_data.js";
import Search from "./Search.js";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const NavBar_v3 = props => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropDownActive, setDropDown] = useState(
    Array(teams_in_leagues.length).fill(false)
  );

  const dropDown = e => {
    const index = e.target.getAttribute("value");

    var dropdown = [];
    dropDownActive.map(drop => {
      dropdown.push(drop);
    });

    dropdown[index] = !dropdown[index];
    setDropDown(dropdown);
  };

  return (
    <nav className="navbar_v3">
      <a
        href="#"
        className="toggle-button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>

      <div className="brand-title">
        <a href="/">The Rugby Vault</a>
      </div>

      <div className={"navbar-links " + (menuOpen && "active")}>
        <ul>
          {teams_in_leagues.map((league, index) => (
            <React.Fragment>
              <li className="dropdown primary-link">
                <a href="#" onClick={dropDown} value={index}>
                  {league.league} <i class="fas fa-caret-down"></i>
                </a>
                <div
                  className={
                    "secondary-links " + (dropDownActive[index] && "active")
                  }
                >
                  {league.teams.map(team => (
                    <li className="secondary-link">
                      <a href={team.link}>{team.name}</a>
                    </li>
                  ))}
                </div>
              </li>
            </React.Fragment>
          ))}
          <li>
            <div className="google">
              {props.credentials === null ? (
                <GoogleLogin
                  clientId="1083928335773-s4qgaso26307cg7n5kcv91avg3vhkqpf.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={response => {
                    props.login(response);
                  }}
                  onFailure={response => {
                    props.login(response);
                  }}
                  cookiePolicy={"single_host_origin"}
                />
              ) : (
                <GoogleLogout
                  clientId="1083928335773-s4qgaso26307cg7n5kcv91avg3vhkqpf.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={response => {
                    props.logout(response);
                  }}
                  onFailure={response => {
                    props.logout(response);
                  }}
                />
              )}
            </div>
          </li>
        </ul>
      </div>
      <Search className="web-search" />
    </nav>
  );
};

export default NavBar_v3;
