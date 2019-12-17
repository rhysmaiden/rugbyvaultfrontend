import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import { tsPropertySignature } from "@babel/types";
import Filter from "./Filter.js";
import config from "react-global-configuration";

const TeamPage = props => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("date");

  //   const [matches, setMatches] = useState([]);
  //   const [tries, setTries] = useState([]);

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    const request =
      config.get("backend_url") +
      "team?id=" +
      props.match.params.id +
      "&order=" +
      filter;
    const response = await fetch(request, {
      mode: "cors"
    });

    console.log(response);

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
    console.log(jsonData[":tries"]);
  };

  return (
    <div className="HomePage">
      <h1>{data.team && data.team.team_name}</h1>
      <div className="grid-heading">
        <h3 className="grid-title">Matches</h3>
        <Filter
          changeFilter={e => {
            setFilter(e);
          }}
          options={["date", "rating"]}
        />
      </div>
      <VideoGrid title="" key="2" data={data.matches} type="match" />
      <div className="grid-heading">
        <h3 className="grid-title">Tries</h3>
        <Filter
          changeFilter={e => {
            setFilter(e);
          }}
          options={["date", "rating"]}
        />
      </div>
      <VideoGrid title="" key="1" data={data.tries} type="try" />
    </div>
  );
};

export default TeamPage;
