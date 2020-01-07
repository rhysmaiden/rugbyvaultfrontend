import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import { tsPropertySignature } from "@babel/types";
import Filter from "./Filter.js";
import config from "react-global-configuration";
import FilterPanel from "./FilterPanel.js";

const TeamPage = props => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("date");
  const [filterOptions, setFilterOptions] = useState([]);

  //   const [matches, setMatches] = useState([]);
  //   const [tries, setTries] = useState([]);

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    var yearString = "";
    var teamString = "";

    if (filterOptions.length != 0) {
      filterOptions[0].options.map(option => {
        if (option.checked) {
          yearString += option.name + ",";
        }
      });

      filterOptions[1].options.map(option => {
        if (option.checked) {
          teamString += option.name + ",";
        }
      });
    }

    yearString = yearString.slice(0, -1);
    teamString = teamString.slice(0, -1);

    const request =
      config.get("backend_url") +
      "matches" +
      "?order=" +
      filter +
      "&year=" +
      (yearString.length == 0 ? "all" : yearString) +
      "&team=" +
      (teamString.length == 0 ? "all" : teamString);
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
    </div>
  );
};

export default TeamPage;
