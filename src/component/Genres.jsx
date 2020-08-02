import React, { Component } from "react";
import Input from "./Input";
export default class Genres extends Component {
  render() {
    const { value, onChange, onHandleGenreSubmit } = this.props;
    return (
      <div>
        <Input
          name="genreName"
          value={value}
          onChange={onChange}
          label="Genre"
          type="text"
        />

        <button onClick={onHandleGenreSubmit}>add genre</button>
      </div>
    );
  }
}
