import React from "react";
import "../App.css";

const Filter = props => {
  const changeFilter = e => {
    props.changeFilter(e.target.value);
  };
  return (
    <div className="Filter">
      <p>Sort by: </p>
      <form>
        <select class="event-type-select" onChange={changeFilter}>
          {props.options &&
            props.options.map(option => (
              <option value={option}>{option}</option>
            ))}
        </select>
      </form>
    </div>
  );
};

export default Filter;
