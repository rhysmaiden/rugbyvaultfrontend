import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Chart from "./Chart.js";
import config from "react-global-configuration";
import YouTube from "react-youtube";

const TryProcessingPage = props => {
  const [tries, setTries] = useState([]);
  const [match, setMatch] = useState({});
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    getData();
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  const handleKeyPress = useCallback(event => {
    console.log(event.keyCode);

    if (event.keyCode == 32) {
      //Focus back on youube video and play
      return;
    } else if (event.keyCode == 107) {
      //Log current time
      console.log(currentTime);
    }
  });

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

  const sendError = async () => {
    const data = {
      id: match.id,
      type: "match"
    };

    const url = config.get("backend_url") + "report/";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    window.location.reload();
  };

  const setTime = () => {
    var currentTotalSeconds = Math.floor(currentTime);
    var currentMinutes = Math.floor(currentTotalSeconds / 60);
    var currentSeconds = currentTotalSeconds % 60;

    console.log(currentMinutes);
    console.log(currentSeconds);

    var start_mins = document.getElementsByClassName("start-min");
    var start_secs = document.getElementsByClassName("start-sec");
    var end_mins = document.getElementsByClassName("end-min");
    var end_secs = document.getElementsByClassName("end-sec");

    console.log(start_mins.length);
    for (var i = 0; i < start_mins.length; i++) {
      // console.log(start_mins[i].value);
      console.log(start_mins[i].value.match(/^[0-9]+$/) != null);
      if (start_mins[i].value.match(/^[0-9]+$/) == null) {
        console.log("WORKED");
        start_mins[i].value = currentMinutes;
        start_secs[i].value = currentSeconds;

        break;
      }

      if (end_mins[i].value.match(/^[0-9]+$/) == null) {
        end_mins[i].value = currentMinutes;
        end_secs[i].value = currentSeconds;

        try {
          start_mins[i + 1].value = currentMinutes;
          start_secs[i + 1].value = currentSeconds;
        } catch (error) {
          console.log("Last try");
          document.getElementsByClassName("submitButton")[1].click();
        }

        break;
      }
    }
  };

  const paused = e => {
    console.log("paused");
    console.log(typeof e.target.getCurrentTime());
    console.log(typeof 0);
    setCurrentTime(e.target.getCurrentTime());

    // 1. UnFocus
    //window.focus();
  };

  return (
    <div className="VideoPlayer">
      <div className="video-con">
        <YouTube
          id="youtube"
          videoId={match.video_link && match.video_link.split("=")[1]} // defaults -> null
          // containerClassName={"video-con"} // defaults -> ''

          // onPlay={} // defaults -> noop
          onPause={paused} // defaults -> noop
          onKeyPress={paused}
        />
      </div>
      <button className="submitButton" onClick={setTime}>
        Set current time
      </button>
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
      <button className="submitButton" onClick={sendError}>
        Error
      </button>
    </div>
  );
};

export default TryProcessingPage;
