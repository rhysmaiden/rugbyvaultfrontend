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
    console.log("Run Get Data");
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
      "player?id=" +
      props.match.params.id +
      "&order=" +
      filter +
      "&year=" +
      (yearString.length == 0 ? "all" : yearString) +
      "&team=" +
      (teamString.length == 0 ? "all" : teamString);
    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();

    console.log(jsonData);

    setData(jsonData);
  };

  function createOptions() {
    console.log("Run Create Options");
    var options = [];
    var years = [];
    var teams = [];

    data.yearFilter.map(year => {
      years.push({ name: year.value, checked: year.checked });
    });

    data.teamFilter.map(team => {
      teams.push({ name: team.value, checked: team.checked });
    });

    options.push({
      name: "Year",
      options: years
    });

    // var teams = [];

    // data.teams.map(team => {
    //   if (data.teamFilter.includes(team.team_name)) {
    //     teams.push({ name: team.team_name, checked: true });
    //   } else {
    //     teams.push({ name: team.team_name, checked: false });
    //   }
    // });

    options.push({
      name: "Team",
      options: teams
    });

    setFilterOptions(options);
  }

  const changeFilter = (name, option) => {
    console.log("Run Change Filter");
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
    getData();
  };

  return (
    <div className="HomePage">
      <div className="video-grid">
        <div className="blank"></div>

        <div className="right-col">
          <div className="grid-heading">
            <h1>{data.player && data.player.name}</h1>
            <Filter
              changeFilter={e => {
                setFilter(e);
              }}
              options={["date", "rating"]}
            />
          </div>
        </div>
        <FilterPanel
          name="Year"
          options={filterOptions}
          changeFilter={changeFilter}
        />
        <VideoGrid key="1" data={data.tries} type="try" />
      </div>
    </div>
  );
};

export default PlayerPage;
