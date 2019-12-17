import React, { useState, useEffect } from "react";
import "./App.css";
import { tsConstructorType } from "@babel/types";
import VideoBox from "./VideoBox.js";

const VideoGrid = props => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(props.data);
  });

  return (
    <div className="VideoGrid">
      <h3 className="grid-title">{props.title}</h3>
      <div className="Grid">
        {videos &&
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
          )}
      </div>
    </div>
  );
};

export default VideoGrid;
