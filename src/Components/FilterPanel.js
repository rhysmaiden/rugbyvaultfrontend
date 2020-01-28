import React, { useEffect, useState } from "react";
import "../App.css";
import FilterOption from "./FilterOption.js";

const FilterPanel = props => {
  useEffect(() => {
    console.log("Update FIlter Panel");
  }, [props.options]);

  return (
    <div className="FilterPanel">
      {props.options &&
        props.options.map(filteroption => (
          <React.Fragment>
            <FilterOption
              name={filteroption.name}
              options={filteroption.options}
              changeFilter={(name, option) => {
                props.changeFilter(name, option);
              }}
            />
          </React.Fragment>
        ))}
    </div>
  );
};

export default FilterPanel;
