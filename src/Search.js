import React, { useEffect, useState } from "react";
import "./App.css";
import { isUserWhitespacable } from "@babel/types";
import config from "react-global-configuration";

// TODO: Make styling spserate from app.css

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    searchQuery();
  }, [searchText]);

  const searchQuery = async () => {
    console.log("TRY");
    if (searchText == "") {
      console.log("FAIL");
      return;
    }
    const request = config.get("backend_url") + "search?query=" + searchText;

    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();

    setSearchItems(jsonData);
    //setData(jsonData);
  };

  const setText = e => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  return (
    <React.Fragment>
      {searchOpen ? (
        <div className="search">
          <input
            autoFocus
            className="search-box"
            value={searchText}
            onChange={setText}
            onBlur={() => {
              setTimeout(function() {
                setSearchOpen(false);
              }, 100);
            }}
          />
          <div className="search-items">
            {searchItems.map(item => (
              <a href={"/" + item.type + "/" + item.id}>
                <div className="search-item">
                  <a>
                    <h4>{item.name}</h4>
                  </a>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <a
          onClick={() => {
            setSearchOpen(true);
          }}
        >
          <i className="fas fa-search"></i>
        </a>
      )}
    </React.Fragment>
  );
};

export default Search;
