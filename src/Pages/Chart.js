import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import { tsPropertySignature } from "@babel/types";
import Filter from "../Components/Filter.js";
import config from "react-global-configuration";

const Chart = props => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [range, setRange] = useState("alltime");

  //   const [matches, setMatches] = useState([]);
  //   const [tries, setTries] = useState([]);

  useEffect(() => {
    getData();
  }, [props, range]);

  const getData = async () => {
    console.log("RUn");
    console.log(props.match.params);

    if (props.match.params.type == undefined) {
      return;
    }
    const request =
      config.get("backend_url") +
      "chart?type=" +
      props.match.params.type +
      "&range=" +
      range;
    const response = await fetch(request, {
      mode: "cors"
    });

    console.log(response);

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  return (
    <div className="HomePage">
      <h1>Top Try Scorers</h1>
      <Filter
        changeFilter={e => {
          setRange(e);
        }}
        options={["allTime", "thisWeek", "thisMonth", "thisYear"]}
      />
      {props.match.params.type === "match" ? (
        <VideoGrid key="1" data={data.matches} type="match" />
      ) : (
        <VideoGrid key="1" data={data.tries} type="try" />
      )}
    </div>
  );
};

export default Chart;
