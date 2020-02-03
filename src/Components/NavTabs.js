import React, { useEffect, useState } from "react";
import "../App.css";

function NavTabs(props) {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = index => {
    setActiveTab(index);
    props.changeTab(index);
  };

  return (
    <div className="NavTabs ignore-mobile">
      <nav>
        <ul>
          {props.titles &&
            props.titles.map((title, index) => (
              <div id={activeTab === index && "activeTab"}>
                <a onClick={() => changeTab(index)}>{title}</a>
              </div>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavTabs;
