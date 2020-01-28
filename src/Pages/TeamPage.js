import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import { tsPropertySignature } from "@babel/types";
import Filter from "../Components/Filter";
import config from "react-global-configuration";
import FilterPanel from "../Components/FilterPanel.js";

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
    var leagueString = "";

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

      filterOptions[2].options.map(option => {
        if (option.checked) {
          leagueString += option.name + ",";
        }
      });
    }

    yearString = yearString.slice(0, -1);
    teamString = teamString.slice(0, -1);
    leagueString = leagueString.slice(0, -1);

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
      "&league=" +
      (leagueString.length == 0 ? "all" : leagueString) +
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
    var leagues = [];

    data.yearFilter.map(year => {
      years.push({ name: year.value, checked: year.checked });
    });

    data.teamFilter.map(team => {
      teams.push({ name: team.value, checked: team.checked });
    });

    data.leagueFilter.map(league => {
      leagues.push({ name: league.value, checked: league.checked });
    });

    options.push({
      name: "Year",
      options: years
    });

    options.push({
      name: "Team",
      options: teams
    });

    options.push({
      name: "League",
      options: leagues
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
      <div className="video-grid">
        <div className="blank"></div>

        <div className="right-col">
          <div className="grid-heading">
            <h1>{data.team && data.team.team_name}</h1>
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
