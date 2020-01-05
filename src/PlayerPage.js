import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Filter from "./Filter.js";
import FilterPanel from "./FilterPanel.js";
import { tsPropertySignature } from "@babel/types";
import config from "react-global-configuration";

const PlayerPage = props => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("date");
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    getData();
  }, [filter]);

  useEffect(() => {
    if (data.length != 0) {
      createOptions();
    }
  }, [data]);

  const getData = async () => {
    const request =
      config.get("backend_url") +
      "player?id=" +
      props.match.params.id +
      "&order=" +
      filter;
    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  function createOptions() {
    var options = [];

    var years = [];
    data.tries.map(trie => {
      var year = trie.match.date.split("-")[2];

      var uniqueYear = true;

      years.map(yearElement => {
        if (year == yearElement.name) {
          uniqueYear = false;
        }
      });

      if (uniqueYear) {
        years.push({ name: year, checked: true });
      }
    });

    options.push({
      name: "Year",
      options: years
    });

    var teams = [];

    data.teams.map(team => {
      teams.push({ name: team.team_name, checked: true });
    });

    options.push({
      name: "Team",
      options: teams
    });

    console.log(options);

    setFilterOptions(options);
  }

  const changeFilter = (name, option) => {
    var temp_filter_options = [];
    filterOptions.map(option => {
      temp_filter_options.push(option);
    });
    temp_filter_options.map(filterOption => {
      if (filterOption.name == name) {
        filterOption.options.map(foption => {
          if (option == foption.name) {
            foption.checked = !foption.checked;
          }
        });
      }
    });

    setFilterOptions(temp_filter_options);
  };

  return (
    <div className="HomePage">
      <h1>{data.player && data.player.name}</h1>

      <div className="grid-heading">
        <h3 className="grid-title">Tries</h3>
        <FilterPanel
          name="Year"
          options={filterOptions}
          changeFilter={changeFilter}
        />
        <Filter
          changeFilter={e => {
            setFilter(e);
          }}
          options={["date", "rating"]}
        />
      </div>
      <VideoGrid key="1" data={data.tries} type="try" />
    </div>
  );
};

export default PlayerPage;
