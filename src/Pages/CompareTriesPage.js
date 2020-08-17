import React, { useEffect, useState } from "react";
import "../App.css";
import Rating from "react-rating";
import config from "react-global-configuration";
import Loader from "react-loader-spinner";
import YouTube from "react-youtube";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const CompareTriesPage = (props) => {
  const [tryA, setTryA] = useState(null);
  const [tryB, setTryB] = useState(null);
  const [isSavingLeft, setIsSavingLeft] = useState(false);
  const [isSavingRight, setIsSavingRight] = useState(false);

  useEffect(() => {
    getTries();
  }, []);

  const getTries = async () => {
    const request = config.get("backend_url") + "comparetries";

    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    jsonData.try_a.start = jsonData.try_a.video_link
      .split("start=")[1]
      .split("&")[0];

    jsonData.try_a.end = jsonData.try_a.video_link
      .split("end=")[1]
      .split(";")[0];

    jsonData.try_b.start = jsonData.try_b.video_link
      .split("start=")[1]
      .split("&")[0];

    jsonData.try_b.end = jsonData.try_b.video_link
      .split("end=")[1]
      .split(";")[0];

    setTryA(jsonData.try_a);
    setTryB(jsonData.try_b);

    setIsSavingLeft(false);
    setIsSavingRight(false);
  };

  const try_a_opts = {
    maxWidth: 100,
    width: window.innerWidth / 2 - 100,
    playerVars: {
      autoplay: 0,
      start: tryA && tryA.start,
      end: tryA && tryA.end,
    },
  };

  const try_b_opts = {
    maxWidth: 100,
    width: window.innerWidth / 2 - 100,
    playerVars: {
      autoplay: 0,
      start: tryB && tryB.start,
      end: tryB && tryB.end,
    },
  };

  const chooseWinner = async (winner, side) => {
    side == 0 ? setIsSavingLeft(true) : setIsSavingRight(true);

    const data = {
      try_a_id: tryA.id,
      try_b_id: tryB.id,
      winner: winner,
    };

    const url = config.get("backend_url") + "comparetries/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getTries();
    });
  };

  return (
    <React.Fragment>
      <div
        className="CompareTries"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          width: "100%",
          paddingTop: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <YouTube
            id="youtube"
            videoId={
              tryA &&
              tryA.video_link.substring(
                tryA.video_link.lastIndexOf("/") + 1,
                tryA.video_link.lastIndexOf("?")
              )
            }
            opts={try_a_opts}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{tryA && tryA.player.name}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                  onClick={() => chooseWinner(tryA.id, 0)}
                  disabled={isSavingLeft || isSavingRight}
                >
                  Winner
                </Button>
                {isSavingLeft && <CircularProgress size={25} />}
              </div>
              <p>
                {tryA &&
                  tryA.match.home_team.team_name +
                    " vs " +
                    tryA.match.away_team.team_name}
              </p>
              <p>{tryA && tryA.match.date}</p>
            </div>
          </div>
        </div>

        <div>
          <YouTube
            id="youtube"
            videoId={
              tryB &&
              tryB.video_link.substring(
                tryB.video_link.lastIndexOf("/") + 1,
                tryB.video_link.lastIndexOf("?")
              )
            }
            opts={try_b_opts}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{tryB && tryB.player.name}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                  onClick={() => chooseWinner(tryB.id, 1)}
                  disabled={isSavingLeft || isSavingRight}
                >
                  Winner
                </Button>
                {isSavingRight && <CircularProgress size={25} />}
              </div>
              <p>
                {tryB &&
                  tryB.match.home_team.team_name +
                    " vs " +
                    tryB.match.away_team.team_name}
              </p>
              <p>{tryB && tryB.match.date}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => (window.location = "tryleaderboard")}
        >
          View Leaderboard
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CompareTriesPage;
