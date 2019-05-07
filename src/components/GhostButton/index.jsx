import React, { Component } from "react";
import "./index.scss";

class GhostButton extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={this.props.className + " ghost-btn"}
      >
        {this.props.children}
      </button>
    );
  }
}

export default GhostButton;
