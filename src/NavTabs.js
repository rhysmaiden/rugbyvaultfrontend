import React, { useEffect, useState } from "react";
import "./App.css";

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
              <a
                onClick={() => changeTab(index)}
                id={activeTab === index && "activeTab"}
              >
                {title}
              </a>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavTabs;
