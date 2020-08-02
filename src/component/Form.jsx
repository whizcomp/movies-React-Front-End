import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Input from "./Input";
import { Select } from "@material-ui/core";
export default class Form extends Component {
  render() {
    const { onSubmit, onChange, data, genres, errors } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Title"
            type="text"
            value={data["name"]}
            onChange={onChange}
            errors={errors.name}
          />
          <Input
            type="number"
            name="currentSeason"
            value={data.currentSeason}
            onChange={onChange}
            label="Current Season"
            errors={errors.currentSeason}
          />
          <Input
            type="number"
            name="episode"
            value={data.episode}
            onChange={onChange}
            label="Current Episode"
            errors={errors.episode}
          />
          <Input
            label="Total Episodes"
            type="number"
            name="episodesPerSeason"
            value={data.episodesPerSeason}
            onChange={onChange}
            errors={errors.episodesPerSeason}
          />
          <Input
            label="Total Seasons"
            type="number"
            name="seasons"
            value={data.seasons}
            onChange={onChange}
            errors={errors.seasons}
          />

          <div>
            <Select
              autoWidth
              native
              value={data.genreId}
              onChange={onChange}
              name="genreId"
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option value={genre._id} key={genre._id}>
                  {genre.name}
                </option>
              ))}
            </Select>
          </div>
          <div style={{ margin: "5px" }}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
