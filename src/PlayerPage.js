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
    console.log("REFRSRH");

    if (filterOptions.length == 0) {
      createOptions();
    }

    // getData();
  }, [filter, filterOptions]);

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

    options.push({
      name: "Year",
      options: [
        { name: "2020", checked: true },
        { name: "2019", checked: true },
        { name: "2018", checked: true }
      ]
    });

    options.push({
      name: "Team",
      options: [
        { name: "Hurricanes", checked: true },
        { name: "New Zealand", checked: true }
      ]
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
