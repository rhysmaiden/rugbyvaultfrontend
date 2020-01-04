import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Chart from "./Chart.js";
import config from "react-global-configuration";
import NavTabs from "./NavTabs.js";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [test, setTest] = useState(false);

  const tabs = ["All", "International", "Super Rugby", "Premiership"];

  useEffect(() => {
    console.log("Use Effect run");
    getData(0);
  }, []);

  const getData = async index => {
    setChangeData(true);
    var request = "";

    if (index == 0) {
      request = config.get("backend_url") + "highlights/";
    } else if (index == 1) {
      request = config.get("backend_url") + "highlights/?league=international";
    } else if (index == 2) {
      request = config.get("backend_url") + "highlights/?league=superrugby";
    } else if (index == 3) {
      request = config.get("backend_url") + "highlights/?league=aviva";
    }

    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
    setChangeData(false);
  };

  return (
    <div className="HomePage">
      <h3 className="grid-title">Recent Matches</h3>
      <NavTabs titles={tabs} activeTab={0} changeTab={getData} />
      <VideoGrid
        key="2"
        data={data.matches}
        changeData={changeData}
        type="match"
      />
      <h3 className="grid-title">Recent Tries</h3>
      <NavTabs titles={tabs} activeTab={0} changeTab={getData} />
      <VideoGrid key="1" data={data.tries} type="try" />
    </div>
  );
};

export default HomePage;
