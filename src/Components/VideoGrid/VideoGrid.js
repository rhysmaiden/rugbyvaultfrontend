import React, { useState, useEffect } from "react";
import "../../App.css";
import "./VideoGrid.css";
import VideoBox from "../VideoBox.js";
import Loader from "react-loader-spinner";
import { useSpring, animated, config } from "react-spring";
import ReactPaginate from "react-paginate";

const VideoGrid = (props) => {
  const [videos, setVideos] = useState([]);

  const animation = useSpring({ opacity: 1, from: { opacity: 1 } });

  useEffect(() => {
    setVideos(props.data);
  }, [props]);

  return !props.loaded ? (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="Oval" color="#d3d3d3" height={100} width={100} />
    </div>
  ) : (
    <div className="VideoGrid">
      <p>{props.total}</p>
      <div className="Grid">
        {true ? (
          videos.map((video) =>
            props.type === "match" ? (
              <VideoBox
                image={
                  "https://img.youtube.com/vi/" +
                  video.video_link.split("v=").pop() +
                  "/0.jpg"
                }
                link={"/video/match/" + video.id}
                title={
                  video.home_team.team_name + " vs " + video.away_team.team_name
                }
                titleLink={"/video/match/" + video.id}
                subtitle={video.date}
                rating={video.avg_rating}
                rating_count={video.rating_count}
              />
            ) : (
              <VideoBox
                image={
                  "https://img.youtube.com/vi/" +
                  video.video_link.split("d/").pop().split("?")[0] +
                  "/0.jpg"
                }
                link={"/video/try/" + video.id}
                title={video.player.name}
                titleLink={"/player/" + video.player.id}
                subtitle={
                  video.match.home_team.team_name +
                  " vs " +
                  video.match.away_team.team_name
                }
                rating={video.avg_rating}
                rating_count={video.rating_count}
              />
            )
          )
        ) : (
          <div className="LoaderContainer">
            <Loader type="Oval" color="#d3d3d3" height={100} width={100} />
          </div>
        )}
      </div>
      {props.pageCount && (
        <div className="Pagination">
          <ReactPaginate
            pageCount={props.pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={props.changePage}
          />
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
