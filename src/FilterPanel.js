import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Filter from "./Filter.js";
import FilterOption from "./FilterOption.js";
import { tsPropertySignature } from "@babel/types";
import config from "react-global-configuration";

const FilterPanel = props => {
  useEffect(() => {
    console.log("Update FIlter Panel");
  }, [props.options]);

  return (
    <div className="FilterPanel">
      <h1>FILTER PANEL</h1>
      {props.options &&
        props.options.map(filteroption => (
          <React.Fragment>
            <h1>FILTEROPTION</h1>
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
