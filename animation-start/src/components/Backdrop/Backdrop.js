import React from "react";

import "./Backdrop.css";

const backdrop = (props) => {
  const cssClasses = ["Backdrop", props.show ? "Opened" : "Closed"];
  return <div className={cssClasses.join("")}></div>;
};

export default backdrop;
