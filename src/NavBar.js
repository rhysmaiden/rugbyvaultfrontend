import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Search.js";
import logo from "./Logo.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// TODO: Make styling spserate from app.css

const NavBar = props => {
  return (
    <div className="NavBar">
      <div className="navContainer">
        <div className="left-nav">
          <a className="brand" href="/">
            <img className="logo" src={logo}></img>THE RUGBY VAULT
          </a>

          <div class="dropdown">
            <button class="dropbtn">
              International
              <i class="fas fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/team/46">South Africa</a>
              <a href="/team/45">New Zealand</a>
              <a href="/team/49">England</a>
              <a href="/team/52">Wales</a>
              <a href="/team/50">Ireland</a>
              <a href="/team/47">Australia</a>
              <a href="/team/53">France</a>
              <a href="/team/55">Japan</a>
              <a href="/team/51">Scotland</a>
              <a href="/team/48">Argentina</a>
              <a href="/team/56">Fiji</a>
              <a href="/team/54">Italy</a>
              <a href="/team/57">Tonga</a>
              <a href="/team/61">Georgia</a>
              <a href="/team/58">Samoa</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Super Rugby
              <i class="fas fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/team/8">Crusaders</a>
              <a href="/team/19">Jaguares</a>
              <a href="/team/7">Brumbies</a>
              <a href="/team/10">Hurricanes</a>
              <a href="/team/14">Bulls</a>
              <a href="/team/13">Sharks</a>
              <a href="/team/11">Chiefs</a>
              <a href="/team/9">Highlanders</a>
              <a href="/team/16">Lions</a>
              <a href="/team/15">Stormers</a>
              <a href="/team/6">Rebels</a>
              <a href="/team/3">Waratahs</a>
              <a href="/team/12">Blues</a>
              <a href="/team/4">Reds</a>
              <a href="/team/20">Sunwolves</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Gallagher Premiership
              <i class="fas fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/team/31">Northampton Saints</a>
              <a href="/team/80">Bristol Bears</a>
              <a href="/team/21">Exteter Chiefs</a>
              <a href="/team/32">Worcester Warriors</a>
              <a href="/team/28">Sale Sharks</a>
              <a href="/team/25">London Irish</a>
              <a href="/team/27">Gloucester</a>
              <a href="/team/23">Harlequins</a>
              <a href="/team/26">Bath</a>
              <a href="/team/22">Wasps</a>
              <a href="/team/30">Leicester Tigers</a>
              <a href="/team/29">Saracens</a>
            </div>
          </div>
        </div>
        <div className="right-nav">
          <SearchBar />
          <div className="google">
            {props.credentials === "" ? (
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
