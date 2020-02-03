import React, { useState, useEffect } from "react";
import "../App.css";
import Rating from "react-rating";
import { useSpring, animated, config } from "react-spring";

function VideoBox(props) {
  const openLink = () => {
    window.location = props.link;
  };

  const [runFadeIn, setRunFadeIn] = useState(false);
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 4000 }
  });
  const fadeOut = useSpring({ opacity: 0, from: { opacity: 1 } });

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      opacity: 1,
      from: { opacity: 0 }
    };
  });

  return (
    <animated.div className="VideoBox">
      {props.link && (
        <React.Fragment>
          <img onClick={openLink} src={props.image}></img>
          <a className="box-link" href={props.titleLink}>
            {props.title}
          </a>
          <p>{props.subtitle}</p>
          {/* <div className="Rating">
            <Rating readonly initialRating={props.rating} />
          </div> */}

          <div className="box-rating">
            <Rating
              emptySymbol={<i className="far fa-star"></i>}
              fullSymbol={<i className="fas fa-star"></i>}
              fractions={2}
              initialRating={props.rating}
              readonly
            />
            <p>{props.rating}</p>
          </div>
        </React.Fragment>
      )}
    </animated.div>
  );
}

export default VideoBox;

// https://img.youtube.com/vi/Iqo09ice4Z0.jpg
// https://img.youtube.com/vi/QXokTpJGduw/0.jpg
