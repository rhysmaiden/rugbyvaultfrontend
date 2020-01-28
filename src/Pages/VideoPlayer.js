import React, { useEffect, useState } from "react";
import "../App.css";
import VideoGrid from "../Components/VideoGrid/VideoGrid.js";
import Rating from "react-rating";
import config from "react-global-configuration";

//TODO: Refactor to not duplicate code

const VideoPlayer = props => {
  const [vid, setVid] = useState({});
  const [grid, setGrid] = useState([]);
  const [userRating, setUserRating] = useState([]);
  const [error, setError] = useState("");
  const [tries, setTries] = useState([]);
  const [showTries, setShowTries] = useState(false);

  useEffect(() => {
    getVideo();
  }, [props]);

  const getVideo = async () => {
    if (props.routeParams.match.params.type == "try") {
      const request =
        config.get("backend_url") +
        "video?type=try" +
        "&id=" +
        props.routeParams.match.params.id;
      const response = await fetch(request, {
        mode: "cors"
      });

      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);

      setVid(jsonData.try);
      setGrid(jsonData.player_tries);
    } else {
      console.log("IS A MATCH");

      var googleId = 0;

      if (props.googleId != "") {
        googleId = props.googleId;
      }

      const request =
        config.get("backend_url") +
        "video?type=match" +
        "&id=" +
        props.routeParams.match.params.id +
        "&googleId=" +
        googleId;
      const response = await fetch(request, {
        mode: "cors"
      });

      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);

      setVid(jsonData.match);
      setGrid(jsonData.matches);
      setUserRating(jsonData.rating);
      setTries(jsonData.tries);
    }
  };

  const sendRating = async rating => {
    const data = {
      googleId: props.googleId,
      id: props.routeParams.match.params.id,
      rating: rating
    };

    console.log(props.googleId);
    if (props.googleId == "") {
      setError("Please Login to rate");
      return;
    }

    setError("");

    const url =
      config.get("backend_url") +
      "rate/?type=" +
      props.routeParams.match.params.type;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const sendError = async () => {
    const data = {
      id: props.routeParams.match.params.id,
      type: props.routeParams.match.params.type
    };

    const url = config.get("backend_url") + "report/";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  return (
    <div className="VideoPlayer">
      <div className="video-con">
        <iframe
          src={
            vid.video_link &&
            vid.video_link.replace("watch?v=", "embed/") + "?autoplay=1"
          }
          frameborder="0"
          width="100%"
          height="100%"
          allowfullscreen
        ></iframe>{" "}
      </div>

      {props.routeParams.match &&
      props.routeParams.match.params.type === "try" ? (
        <React.Fragment>
          <div className="video-description">
            <div className="left-description">
              {vid.player && (
                <React.Fragment>
                  <h1>
                    <a href={"/player/" + vid.player.id}>{vid.player.name}</a>

                    <p>
                      <a href={"/team/" + vid.match.home_team.id}>
                        {vid.match.home_team.team_name}
                      </a>{" "}
                      vs{" "}
                      <a href={"/team/" + vid.match.away_team.id}>
                        {vid.match.away_team.team_name}
                      </a>
                    </p>
                  </h1>
                  <div className="description-sub">
                    <div className="ratings">
                      <div className="box-rating">
                        <Rating
                          emptySymbol={<i className="far fa-star"></i>}
                          fullSymbol={<i className="fas fa-star"></i>}
                          fractions={2}
                          initialRating={vid.avg_rating}
                          readonly
                        />
                        <p>{vid.avg_rating}</p>

                        <p>({vid.rating_count} ratings)</p>
                      </div>
                    </div>
                    <p>{vid.date && vid.date}</p>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="right-description">
              <Rating
                emptySymbol={<i className="far fa-star fa-lg"></i>}
                fullSymbol={<i className="fas fa-star fa-lg"></i>}
                initialRating={userRating}
                onChange={sendRating}
              />
            </div>
          </div>
          <VideoGrid title="Other Tries" key="3" data={grid} type="try" />
        </React.Fragment>
      ) : (
        vid.home_team && (
          <React.Fragment>
            <div className="video-description">
              <div className="left-description">
                <h1>
                  <a href={"/team/" + vid.home_team.id}>
                    {vid.home_team.team_name}
                  </a>
                  <a> vs </a>
                  <a href={"/team/" + vid.away_team.id}>
                    {vid.away_team.team_name}
                  </a>
                </h1>
                <div className="description-sub">
                  <div className="ratings">
                    <div className="box-rating">
                      <Rating
                        emptySymbol={<i className="far fa-star"></i>}
                        fullSymbol={<i className="fas fa-star"></i>}
                        fractions={2}
                        initialRating={vid.avg_rating}
                        readonly
                      />
                      <p>{vid.avg_rating}</p>

                      <p>({vid.rating_count} ratings)</p>
                    </div>
                  </div>
                  <p>{vid.date && vid.date}</p>
                </div>
              </div>
              <div className="right-description">
                <div>
                  <Rating
                    emptySymbol={<i className="far fa-star fa-lg"></i>}
                    fullSymbol={<i className="fas fa-star fa-lg"></i>}
                    initialRating={userRating}
                    onChange={sendRating}
                  />
                  <p className="rating-error">{error}</p>
                </div>

                <button onClick={sendError}>Error</button>
              </div>
            </div>
            <button
              className="action-button blue-button"
              onClick={() => {
                console.log(tries);
                setShowTries(!showTries);
              }}
            >
              {showTries ? "Hide" : "Show match tries"}
            </button>
            {showTries && (
              <VideoGrid title="Tries" key="9" data={tries} type="try" />
            )}
            <VideoGrid title="Match History" key="4" data={grid} type="match" />
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default VideoPlayer;
