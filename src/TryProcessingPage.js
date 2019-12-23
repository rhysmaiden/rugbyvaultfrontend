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

  const submitTries = e => {
    e.preventDefault();

    var index = 0;

    tries.map(trie => {
      var start_min = e.target[index].value;
      var start_sec = e.target[index + 1].value;
      var end_min = e.target[index + 2].value;
      var end_sec = e.target[index + 3].value;

      trie.start_time = parseInt(start_min) * 60 + parseInt(start_sec);
      trie.end_time = parseInt(end_min) * 60 + parseInt(end_sec);

      index += 5;
    });

    sendTriesToBackend();
  };

  const sendTriesToBackend = async () => {
    const request = config.get("backend_url") + "addtry/";

    const data = {
      tries: tries,
      match: match
    };

    const response = await fetch(request, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    window.location.reload();
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
      <form onSubmit={submitTries}>
        <div className="try-times">
          <p className="form-heading">Name</p>
          <p className="form-heading">Start (min)</p>
          <p className="form-heading">Start (sec)</p>
          <p className="form-heading">
            End <br />
            (min)
          </p>

          <p className="form-heading">
            End <br />
            (sec)
          </p>

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

                <input
                  className="end-min"
                  type="number"
                  min="0"
                  max="30"
                ></input>
                <input
                  className="end-sec"
                  type="number"
                  min="0"
                  max="59"
                ></input>
                <div className="errorDiv">
                  <input className="errorCheckbox" type="checkbox"></input>
                </div>
              </React.Fragment>
            ))}
        </div>
        <button className="submitButton" type="submit">
          Submit Tries
        </button>
      </form>
    </div>
  );
};

export default TryProcessingPage;
