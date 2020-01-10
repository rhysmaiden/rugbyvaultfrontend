import React, { useEffect, useState } from "react";
import "./App.css";
import { teams_in_leagues } from "./league_data.js";
import Search from "./Search.js";

const NavBar_v3 = () => {
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

      <div className="brand-title">The Rugby Vault</div>

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
        </ul>
      </div>
      <Search className="web-search" />
    </nav>
  );
};

export default NavBar_v3;
