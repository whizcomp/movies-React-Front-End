import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import http from "./http";
import Joi from "joi-browser";
import Form from "./Form";
import { Grid } from "@material-ui/core";
import { apiUrl } from "./config.json";
const endpoint = apiUrl;
const useStyles = (theme) => ({
  root: {
    width: 300,
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
class Moviedetails extends Component {
  state = {
    data: {
      _id: "",
      name: "",
      currentSeason: "",
      episode: "",
      episodesPerSeason: "",
      seasons: "",
      genreId: "",
    },
    errors: {},
    genres: [],
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
    const { data: genres } = await http.get(endpoint + "/genres");
    const { data: movie } = await http.get(
      `${endpoint}/movies/${this.props.match.params.id}`
    );

    this.setState({ genres, data: this.dataToModel(movie) });
  }
  dataToModel = (movie) => {
    return {
      _id: movie._id,
      name: movie.name,
      currentSeason: movie.currentSeason,
      episode: movie.currentEpisode,
      episodesPerSeason: movie.numberOfEpisodes,
      seasons: movie.numberOfSeasons,
      genreId: movie.genre._id,
    };
  };
  handleChange = ({ currentTarget: input }) => {
    const genres = [...this.state.genres];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    genres[input.name] = input.value;
    this.setState({ data, genres });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: movie } = this.state;
      const body = { ...movie };
      delete body._id;
      const { data } = await http.put(`${endpoint}/movies/${movie._id}`, body);
      this.setState({ data });
      this.props.history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { data, genres, errors } = this.state;
    return (
      <div>
        <Grid container className={classes.paper}>
          <Grid item>
            <h1>Movie details of {this.state.data.name}</h1>
            <Form
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              data={data}
              errors={errors}
              genres={genres}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(Moviedetails);
