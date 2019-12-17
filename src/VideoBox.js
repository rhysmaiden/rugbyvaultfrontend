import React from "react";
import "./App.css";
import Rating from "react-rating";

function VideoBox(props) {
  const openLink = () => {
    window.location = props.link;
  };

  return (
    <div className="VideoBox">
      {props.link && (
        <React.Fragment>
          <img onClick={openLink} src={props.image}></img>
          <a href={props.titleLink}>{props.title}</a>
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
    </div>
  );
}

export default VideoBox;

// https://img.youtube.com/vi/Iqo09ice4Z0.jpg
// https://img.youtube.com/vi/QXokTpJGduw/0.jpg
