import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import config from "react-global-configuration";
import NavTabs from "../Components/NavTabs.js";
import { tabs, tab_slugs } from "../league_data.js";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [tryIndex, setTryIndex] = useState(0);
  const [matchDataLoaded, setMatchDataLoaded] = useState(false);
  const [tryDataLoaded, setTryDataLoaded] = useState(false);

  useEffect(() => {
    getData(0);
  }, []);

  const getData = async (index, bar) => {
    if (bar == 0) {
      setMatchDataLoaded(false);
    } else if (bar == 1) {
      setTryDataLoaded(false);
    } else {
      setMatchDataLoaded(false);
      setTryDataLoaded(false);
    }

    var request = config.get("backend_url") + "highlights/?";

    if (bar == 0) {
      request += `league_match=${tab_slugs[index]}`;
      request += `&league_try=${tab_slugs[tryIndex]}`;
      setMatchIndex(index);
    } else {
      request += `league_try=${tab_slugs[index]}`;
      request += `&league_match=${tab_slugs[matchIndex]}`;
      setTryIndex(index);
    }

    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setData(jsonData);

    if (bar == 0) {
      setMatchDataLoaded(true);
    } else if (bar == 1) {
      setTryDataLoaded(true);
    } else {
      setMatchDataLoaded(true);
      setTryDataLoaded(true);
    }
  };

  return (
    <div className="HomePage">
      <h3 className="grid-title">Recent Matches</h3>
      <NavTabs
        titles={tabs}
        activeTab={0}
        changeTab={(index) => {
          getData(index, 0);
        }}
      />

      <VideoGrid
        key="2"
        data={data.matches}
        changeData={changeData}
        loaded={matchDataLoaded}
        type="match"
      />
      <div className="video-grid-actions">
        <button
          className="action-button blue-button"
          onClick={() => {
            window.location = "/matches";
          }}
        >
          View more
        </button>
      </div>
      <h3 className="grid-title">Recent Tries</h3>
      <NavTabs
        titles={tabs}
        activeTab={0}
        changeTab={(index) => {
          getData(index, 1);
        }}
      />
      <VideoGrid key="1" data={data.tries} type="try" loaded={tryDataLoaded} />
      <div className="video-grid-actions">
        <button
          className="action-button blue-button"
          onClick={() => {
            window.location = "/tries";
          }}
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default HomePage;
