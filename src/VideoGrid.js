import React, { useState, useEffect } from "react";
import "./App.css";
import { tsConstructorType } from "@babel/types";
import VideoBox from "./VideoBox.js";
import Loader from "react-loader-spinner";
import { useSpring, animated, config } from "react-spring";
import ReactPaginate from "react-paginate";

const VideoGrid = props => {
  const [videos, setVideos] = useState([]);

  const animation = useSpring({ opacity: 1, from: { opacity: 1 } });

  useEffect(() => {
    console.log("Changed");
    setVideos(props.data);
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2000 }
  });

  const fadeOut = useSpring({
    opacity: 0,
    from: { opacity: 1 },
    config: { duration: 2000 }
  });

  return (
    <animated.div
      style={props.changeData ? fadeOut : fadeIn}
      className="VideoGrid"
    >
      {/* <h3 className="grid-title">{props.title}</h3> */}
      <div className="Grid">
        {videos ? (
          videos.map(video =>
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
                subtitle={video.date}
                rating={video.avg_rating}
                rating_count={video.rating_count}
              />
            ) : (
              <VideoBox
                image={
                  "https://img.youtube.com/vi/" +
                  video.video_link
                    .split("d/")
                    .pop()
                    .split("?")[0] +
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
          <Loader
            type="RevolvingDot"
            color="#0d3f69"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
      </div>
      <div className="Pagination">
        <ReactPaginate
          pageCount={props.pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={props.changePage}
        />
      </div>
    </animated.div>
  );
};

export default VideoGrid;
