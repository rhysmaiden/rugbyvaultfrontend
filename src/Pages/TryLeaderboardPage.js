import React, { useEffect, useState } from "react";
import "../App.css";
import Rating from "react-rating";
import config from "react-global-configuration";
import Loader from "react-loader-spinner";
import YouTube from "react-youtube";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TryLeaderboardPage = (props) => {
  const [tries, setTries] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getTryLeaderboard();
  }, []);

  const getTryLeaderboard = async () => {
    const request = config.get("backend_url") + "triesleaderboard";

    const response = await fetch(request, {
      mode: "cors",
    });

    const jsonData = await response.json();

    setTries(jsonData.tries);
  };

  return (
    <div className="Leaderboard" style={{ padding: "20px" }}>
      <h1>Try Leaderboard</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="left">Player</StyledTableCell>
              <StyledTableCell align="left">Match</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Link</StyledTableCell>
              <StyledTableCell align="left">Elo Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tries.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.player.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.match.home_team.team_name +
                    " vs " +
                    row.match.away_team.team_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.match.date}</StyledTableCell>
                <StyledTableCell align="left">
                  <a href={`/video/try/${row.id}`}>Watch</a>
                </StyledTableCell>
                <StyledTableCell align="left">{row.elo_rating}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TryLeaderboardPage;
