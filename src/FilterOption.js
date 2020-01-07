import React, { useEffect, useState } from "react";
import "./App.css";
import VideoGrid from "./VideoGrid.js";
import Filter from "./Filter.js";
import { tsPropertySignature } from "@babel/types";
import config from "react-global-configuration";

const FilterOption = props => {
  useEffect(() => {
    console.log("Update fileteroption");
  });

  return (
    <div className="FilterOption">
      <h3>{props.name}</h3>
      {props.options.map(option => (
        <div className="checkOption">
          <input
            checked={option.checked}
            type="checkbox"
            onChange={() => {
              props.changeFilter(props.name, option.name);
            }}
          ></input>
          <p>{option.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterOption;
