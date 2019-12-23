import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Chart from "./Chart.js";
import config from "react-global-configuration";

const TryProcessingPage = props => {
  const [tries, setTries] = useState([]);
  const [match, setMatch] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log(props);
    const request =
      config.get("backend_url") + "processing?id=" + props.match.params.id;
    const response = await fetch(request, {
      mode: "cors"
    });

    const jsonData = await response.json();
    console.log(jsonData);
    setTries(jsonData.players);
    setMatch(jsonData.match);
  };

  return (
    <div className="VideoPlayer">
      <div className="video-con">
        <iframe
          src={
            match.video_link &&
            match.video_link.replace("watch?v=", "embed/") + "?autoplay=1"
          }
          frameBorder="0"
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>{" "}
      </div>
      <div className="try-times">
        <p className="form-heading">Name</p>
        <p className="form-heading">Start (min)</p>
        <p className="form-heading">Start (min)</p>
        <p className="form-heading">Start (min)</p>

        <p className="form-heading">End (min)</p>

        <p className="form-heading">Error</p>

        {tries &&
          tries.map(trie => (
            <React.Fragment>
              <p className="form-name">
                {trie.player_name + " (" + trie.time + "')"}
              </p>

              <input
                className="start-min"
                type="number"
                min="0"
                max="30"
              ></input>
              <input
                className="start-sec"
                type="number"
                min="0"
                max="59"
              ></input>

              <input className="end-min" type="number" min="0" max="30"></input>
              <input className="end-sec" type="number" min="0" max="59"></input>
              <input type="checkbox"></input>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default TryProcessingPage;
