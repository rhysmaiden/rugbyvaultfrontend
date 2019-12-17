import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Chart from "./Chart.js";
import config from "react-global-configuration";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [test, setTest] = useState(false);

  useEffect(() => {
    console.log("Use Effect run");
    getData();
  }, []);

  const getData = async () => {
    if (test) {
      return;
    }
    setTest(true);
    console.log("Set to true");
    const request = config.get("backend_url") + "highlights/";
    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  return (
    <div className="HomePage">
      <VideoGrid
        title="Recent Matches"
        key="2"
        data={data.matches}
        type="match"
      />
      <VideoGrid title="Recent Tries" key="1" data={data.tries} type="try" />
    </div>
  );
};

export default HomePage;
