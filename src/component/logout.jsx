import React, { Component } from "react";

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/login";
  }
  render() {
    return (
      <div>
        <h1>loging out</h1>
      </div>
    );
  }
}
