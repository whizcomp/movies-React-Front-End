import React, { Component } from "react";
import http from "./http";
import Tables from "./table";
import Joi from "joi-browser";
import { submit } from "./genreService";
import { changeData } from "./genreService";
import Dialogs from "./Dialog";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
});
class Movie extends Component {
  state = {
    Movies: [],
    genres: [],
    genre: {
      genreName: "",
    },
    data: {
      name: "",
      currentSeason: "",
      episode: "",
      episodesPerSeason: "",
      seasons: "",
      genreId: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().min(3).max(255).required().label("Title"),
    currentSeason: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Current Season"),
    episode: Joi.number().min(1).max(100).required().label("Current Episode"),
    episodesPerSeason: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Total Episodes"),
    seasons: Joi.number().min(1).max(100).required().label("Total seasons"),
    genreId: Joi.string().label("Genre"),
  };
  async componentDidMount() {
    const { data: Movies } = await http.get("/movies");
    const { data: genres } = await http.get("/genres");
    this.setState({ Movies, genres });
  }
  handleChange = ({ currentTarget: input }) => {
    const genre = { ...this.state.genre };
    const data = { ...this.state.data };
    genre[input.name] = input.value;
    data[input.name] = input.value;
    this.setState({ data, genre });
  };
  doSubmit = async () => {
    try {
      const { data } = await http.post(`/movies`, this.state.data);
      const Movies = [data, ...this.state.Movies];
      this.setState({ Movies });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
      }
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleGenreSubmit = async () => {
    try {
      const { data } = await submit(this.state.genre);
      const genres = [data, ...this.state.genres];
      this.setState({ genres });
    } catch (error) {}
  };
  handleDelete = async (movie) => {
    try {
      await http.delete(`/movies/${movie._id}`);
      const Movies = this.state.Movies.filter((m) => m._id !== movie._id);
      this.setState({ Movies });
    } catch (error) {}
  };
  handleEpisode = async (movie) => {
    const Movies = this.state.Movies;
    const index = Movies.indexOf(movie);
    const Movie = Movies[index];
    Movie.currentEpisode++;
    if (Movie.currentEpisode === Movie.numberOfSeasons) {
      Movie.currentSeason++;
      Movie.currentEpisode = 1;
    }
    await changeData(movie, movie._id);

    this.setState({ Movies });
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };
  render() {
    const { Movies, genres, data, errors } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Tables
          Movies={Movies}
          onDelete={this.handleDelete}
          onHandleEpisode={this.handleEpisode}
        />

        <Dialogs
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          data={data}
          genres={genres}
          errors={errors}
        />
      </Paper>
    );
  }
}
export default withStyles(useStyles)(Movie);
