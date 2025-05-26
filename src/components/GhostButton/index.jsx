import React from "react";
import "./index.scss";

const GhostButton = ({ onClick, className = "", children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ghost-btn`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GhostButton;
