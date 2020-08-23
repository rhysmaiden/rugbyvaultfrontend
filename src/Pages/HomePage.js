import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import config from "react-global-configuration";
import NavTabs from "../Components/NavTabs.js";
import { tabs, tab_slugs } from "../league_data.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";

const HomePage = () => {
  const [changeData, setChangeData] = useState(false);
  const [matchDataLoaded, setMatchDataLoaded] = useState(false);

  const [allMatches, setAllMatches] = useState([]);
  const [superRugbyMatches, setSuperRugbyMatches] = useState([]);
  const [internationalMatches, setInternationalMatches] = useState([]);
  const [pro14Matches, setPro14Matches] = useState([]);
  const [premiershipMatches, setPremiershipMatches] = useState([]);

  const [allTries, setAllTries] = useState([]);
  const [superRugbyTries, setSuperRugbyTries] = useState([]);
  const [internationalTries, setInternationalTries] = useState([]);
  const [pro14Tries, setPro14Tries] = useState([]);
  const [premiershipTries, setPremiershipTries] = useState([]);

  const [tabIndex, settabIndex] = React.useState(0);

  useEffect(() => {
    getData(); //Get all matches and tries
    getSuperRugbyData();
    getInternationalData();
    getPro14Data();
    getPremiershipData();
  }, []);

  const handletabIndexChange = (event, newValue) => {
    settabIndex(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    var matches = [];
    var tries = [];

    if (tabIndex == 0) {
      matches = allMatches;
      tries = allTries;
    } else if (tabIndex == 1) {
      matches = internationalMatches;
      tries = internationalTries;
    } else if (tabIndex == 2) {
      matches = superRugbyMatches;
      tries = superRugbyTries;
    } else if (tabIndex == 3) {
      matches = pro14Matches;
      tries = pro14Tries;
    } else if (tabIndex == 4) {
      matches = premiershipMatches;
      tries = premiershipTries;
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
        style={{ marginTop: "10px" }}
      >
        {value === index && (
          <React.Fragment>
            <VideoGrid
              key={tabIndex}
              data={matches}
              changeData={changeData}
              loaded={matchDataLoaded}
              type="match"
            />
            {/* <div className="video-grid-actions">
              <button
                className="action-button blue-button"
                onClick={() => {
                  window.location = "/matches";
                }}
              >
                View more
              </button>
            </div> */}
            {matchDataLoaded && (
              <Divider variant="middle" style={{ marginBottom: "20px" }} />
            )}

            <VideoGrid
              key={tabIndex + 1100}
              data={tries}
              changeData={changeData}
              loaded={true}
              type="try"
            />
          </React.Fragment>
        )}
      </div>
    );
  }

  const getData = async () => {
    var request =
      config.get("backend_url") + "highlights/?league_try=all&league_match=all";

    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setAllMatches(jsonData.matches);
    setAllTries(jsonData.tries);

    setMatchDataLoaded(true);
  };

  const getSuperRugbyData = async () => {
    var request =
      config.get("backend_url") +
      "highlights/?league_match=superrugby&league_try=superrugby";
    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setSuperRugbyMatches(jsonData.matches);
    setSuperRugbyTries(jsonData.tries);
  };

  const getPro14Data = async () => {
    var request =
      config.get("backend_url") +
      "highlights/?league_match=pro14&league_try=pro14";
    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setPro14Matches(jsonData.matches);
    setPro14Tries(jsonData.tries);
  };

  const getInternationalData = async () => {
    var request =
      config.get("backend_url") +
      "highlights/?league_match=international&league_try=international";
    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setInternationalMatches(jsonData.matches);
    setInternationalTries(jsonData.tries);
  };

  const getPremiershipData = async () => {
    var request =
      config.get("backend_url") +
      "highlights/?league_match=aviva&league_try=aviva";
    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setPremiershipMatches(jsonData.matches);
    setPremiershipTries(jsonData.tries);
  };

  return (
    <div className="HomePage">
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handletabIndexChange}
        aria-label="disabled tabs example"
        variant="scrollable"
        scrollButtons="auto"
        style={{ marginTop: "20px" }}
      >
        <Tab label="All" />
        <Tab label="International" />
        <Tab label="Super Rugby" />
        <Tab label="Pro 14" />
        <Tab label="Gallagher Premiership" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}></TabPanel>
      <TabPanel value={tabIndex} index={1}></TabPanel>
      <TabPanel value={tabIndex} index={2}></TabPanel>
      <TabPanel value={tabIndex} index={3}></TabPanel>
      <TabPanel value={tabIndex} index={4}></TabPanel>
    </div>
  );
};

export default HomePage;
