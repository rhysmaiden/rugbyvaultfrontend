import React, { useEffect, useState } from "react";
import "../App.css";
import Rating from "react-rating";
import config from "react-global-configuration";
import Loader from "react-loader-spinner";
import YouTube from "react-youtube";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Play from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    width: window.innerWidth - 140,
  },
});

const CompareTriesNZPage = (props) => {
  const [tryA, setTryA] = useState(null);
  const [tryB, setTryB] = useState(null);
  const [isSavingLeft, setIsSavingLeft] = useState(false);
  const [isSavingRight, setIsSavingRight] = useState(false);
  const [tries, setTries] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getTries();
    getTryLeaderboard();
  }, []);

  const getTries = async () => {
    const request = config.get("backend_url") + "comparetriesnz";

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

    const url = config.get("backend_url") + "comparetriesnz/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getTries();
      getTryLeaderboard();
    });
  };

  const getTryLeaderboard = async () => {
    const request = config.get("backend_url") + "nztriesleaderboard";

    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setTries(jsonData.tries);
  };

  return (
    <React.Fragment>
      <h1>Super Rugby Aotearoa - Which Try is Better?</h1>
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
                  Try A
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
                  Try B
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

      <div style={{ marginTop: 40 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Rank</StyledTableCell>
                <StyledTableCell align="center">Link</StyledTableCell>
                <StyledTableCell align="left">Player</StyledTableCell>
                <StyledTableCell align="left">Match</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>

                <StyledTableCell align="center">Elo Rating</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tries.map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" padding="none">
                    <IconButton
                      href={`/video/try/${row.id}`}
                      size="medium"
                      iconStyle={{ width: 60, height: 60 }}
                      color="primary"
                    >
                      <Play />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <a
                      style={{ textDecoration: "underline" }}
                      href={`/player/${row.player.id}`}
                    >
                      {" "}
                      {row.player.name}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.match.home_team.team_name +
                      " vs " +
                      row.match.away_team.team_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.match.date}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.nz_elo_rating}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
};

export default CompareTriesNZPage;
