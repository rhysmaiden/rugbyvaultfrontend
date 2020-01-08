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
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData();
  }, [filter, pageNumber]);

  useEffect(() => {
    if (data.length != 0) {
      createOptions();
    }
  }, [data]);

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
      "team?id=" +
      props.match.params.id +
      "&order=" +
      filter +
      "&year=" +
      (yearString.length == 0 ? "all" : yearString) +
      "&team=" +
      (teamString.length == 0 ? "all" : teamString) +
      "&page=" +
      pageNumber;
    const response = await fetch(request, {
      mode: "cors"
    });

    console.log(response);

    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
    console.log(jsonData[":tries"]);
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
    setPageNumber(1);
    if (pageNumber == 1) {
      getData();
    }
  };

  const changePage = pageNumber => {
    setPageNumber(pageNumber.selected + 1);
  };

  return (
    <div className="HomePage">
      <h1>{data.team && data.team.team_name}</h1>
      <div className="video-grid">
        <div className="blank"></div>

        <div className="right-col">
          <div className="grid-heading">
            <h3 className="grid-title">Matches</h3>
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
        <VideoGrid
          key="2"
          data={data.matches}
          type="match"
          changePage={changePage}
          pageCount={data.pageCount}
        />
      </div>
    </div>
  );
};

export default TeamPage;
