import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import Rating from "react-rating";
import config from "react-global-configuration";
import YouTube from "react-youtube";
import debounce from "lodash.debounce";

//TODO: Refactor to not duplicate code

const VideoPlayer = props => {
  const [vids, setVids] = useState({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(0);

  const [grid, setGrid] = useState([]);
  const [userRating, setUserRating] = useState([]);
  const [error, setError] = useState("");
  const [tries, setTries] = useState([]);
  const [showTries, setShowTries] = useState(false);
  const [ops, setOps] = useState({});
  const [changingVid, setChangingVid] = useState(false);

  useEffect(() => {
    //getVideos();
    setVids(["XSJLd3y-ay8", "Qg5Wh-8KyiA", "XAowXcmQ-kA"]);

    const ops = {
      height: "100%",
      width: "640",
      playerVars: {
        start: 15,
        end: 17,
        autoplay: 1
      }
    };

    setOps(ops);
  }, [props]);

  const nextVideo = index => {
    //This function was being called twice by the Youtube Component
    //The boolean variable "changeVid" is set to a 3 second timeout

    if (changingVid) {
      return;
    }

    setChangingVid(true);

    console.log(index);

    const start_time = 15;
    const end_time = 17;

    const ops = {
      height: "100%",
      width: "640",
      playerVars: {
        start: start_time,
        end: end_time,
        autoplay: 1
      }
    };

    setOps(ops);
    setCurrentlyPlayingId(currentlyPlayingId + 1);

    setTimeout(function() {
      setChangingVid(false);
    }, 3000);
  };

  const getVideos = async () => {
    if (props.routeParams.match.params.type == "try") {
      const request =
        config.get("backend_url") +
        "vidlist?type=try" +
        "&ids=" +
        props.routeParams.match.params.ids;
      const response = await fetch(request, {
        mode: "cors"
      });

      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);

      setVids(jsonData.tries);
    } else {
      const request =
        config.get("backend_url") +
        "vidlist?type=player" +
        "&id=" +
        props.routeParams.match.params.id;
      const response = await fetch(request, {
        mode: "cors"
      });

      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);

      setVids(jsonData.match);
    }
  };

  return (
    <div className="VideoPlayer">
      <div className="video-con">
        {/* <YouTube
          id="youtube"
          videoId={
            vids[currentlyPlayingId].video_link &&
            vids[currentlyPlayingId].video_link.split("=")[1]
          } // defaults -> null
          // containerClassName={"video-con"} // defaults -> ''

          // onPlay={} // defaults -> noop
          onPause={paused} // defaults -> noop
          onKeyPress={paused}
        /> */}
        <YouTube
          id="youtube"
          videoId={vids[currentlyPlayingId]} // defaults -> null
          // containerClassName={"video-con"} // defaults -> ''
          opts={ops}
          //OnEnd is called twice without debounce
          onEnd={nextVideo}
          // onPlay={} // defaults -> noop
        />
      </div>
      {/* <button onClick={nextVideo}>NEXT</button> */}
    </div>
  );
};

export default VideoPlayer;
