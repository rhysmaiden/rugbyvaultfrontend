import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Filter from "./Filter.js";
import { tsPropertySignature } from "@babel/types";
import config from "react-global-configuration";

const PlayerPage = props => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("date");

  useEffect(() => {
    getData();
  }, [filter]);

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

  return (
    <div className="HomePage">
      <h1>{data.player && data.player.name}</h1>

      <div className="grid-heading">
        <h3 className="grid-title">Tries</h3>
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
