import React, { useEffect, useState, useCallback, useRef } from "react";
import "../App.css";
import config from "react-global-configuration";
import YouTube from "react-youtube";

const TryProcessingPage = (props) => {
  const [tries, setTries] = useState([]);
  const [match, setMatch] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(false);
  const playingVideoRef = useRef(playingVideo);
  const currentTimeRef = useRef(currentTime);
  const youtubePlayer = useRef(null);

  useEffect(() => {
    getData();
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = async (event) => {
    if (event.keyCode == 32) {
      // Key Space
      event.preventDefault();
      playingVideoRef.current
        ? youtubePlayer.current.internalPlayer.pauseVideo()
        : youtubePlayer.current.internalPlayer.playVideo();

      console.log("reached");
      playingVideoRef.current = !playingVideoRef.current;
    } else if (event.keyCode == 76) {
      // Key L
      setTime();
    } else if (event.keyCode == 85) {
      // Key U
      undo();
    } else if (event.keyCode == 37) {
      // Key Left
      var current_time = await youtubePlayer.current.internalPlayer.getCurrentTime();
      youtubePlayer.current.internalPlayer.seekTo((await current_time) - 5);
    } else if (event.keyCode == 39) {
      // Key Right
      var current_time = await youtubePlayer.current.internalPlayer.getCurrentTime();
      youtubePlayer.current.internalPlayer.seekTo((await current_time) + 5);
    }
  };

  const getData = async () => {
    console.log(props);
    const request =
      config.get("backend_url") + "processing?id=" + props.match.params.id;
    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();
    setTries(jsonData.players);
    setMatch(jsonData.match);
  };

  const submitTries = (e) => {
    e.preventDefault();

    var index = 0;

    tries.map((trie) => {
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

  const undo = () => {
    var start_mins = document.getElementsByClassName("start-min");
    var start_secs = document.getElementsByClassName("start-sec");
    var end_mins = document.getElementsByClassName("end-min");
    var end_secs = document.getElementsByClassName("end-sec");

    for (var i = 0; i < start_mins.length; i++) {
      if (start_mins[i].value.match(/^[0-9]+$/) == null) {
        end_mins[i - 1].value = null;
        end_secs[i - 1].value = null;
        break;
      }

      if (end_mins[i].value.match(/^[0-9]+$/) == null) {
        start_mins[i].value = null;
        start_secs[i].value = null;
        break;
      }
    }
  };

  const sendTriesToBackend = async () => {
    const request = config.get("backend_url") + "addtry/";

    const data = {
      tries: tries,
      match: match,
    };

    const response = await fetch(request, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  };

  const sendError = async () => {
    const data = {
      id: match.id,
      type: "match",
    };

    const url = config.get("backend_url") + "report/";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  };

  const setTime = () => {
    var currentTotalSeconds = Math.floor(currentTimeRef.current);
    var currentMinutes = Math.floor(currentTotalSeconds / 60);
    var currentSeconds = currentTotalSeconds % 60;

    var start_mins = document.getElementsByClassName("start-min");
    var start_secs = document.getElementsByClassName("start-sec");
    var end_mins = document.getElementsByClassName("end-min");
    var end_secs = document.getElementsByClassName("end-sec");

    for (var i = 0; i < start_mins.length; i++) {
      if (start_mins[i].value.match(/^[0-9]+$/) == null) {
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
          document.getElementsByClassName("submitButton")[1].click();
        }

        break;
      }
    }
  };

  const paused = async (e) => {
    currentTimeRef.current = await e.target.getCurrentTime();
  };

  const opts = {
    maxWidth: 500,
    width: window.innerWidth > 500 ? 500 : window.innerWidth - 40,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="VideoPlayer">
      <div className="processing-video-con">
        <YouTube
          id="youtube"
          videoId={match.video_link && match.video_link.split("=")[1]} // defaults -> null
          onPause={paused} // defaults -> noop
          ref={youtubePlayer}
          opts={opts}
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
            tries.map((trie) => (
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
