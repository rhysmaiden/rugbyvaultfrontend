import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Search.js";
import logo from "./Logo.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// TODO: Make styling spserate from app.css

const NavBar_v2 = props => {
  return (
    <nav>
      <ul className="menu">
        <li className="logo">
          <a href="/">The rugby vault</a>
        </li>
        <li className="item">
          <a href="/">Home</a>
        </li>
        <li className="item">
          <a href="/">Charts</a>
        </li>

        <li className="item button">
          <a href="/">Login</a>
        </li>
        <li className="item button secondary">
          <a href="/">Sign Up</a>
        </li>
        <li className="toggle">
          <a href="#">
            <span className="bars"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar_v2;
