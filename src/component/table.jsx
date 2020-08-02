import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
export default class Tables extends Component {
  state = {
    columns: [
      { id: 1, label: "Title" },
      { id: 2, label: "Current Season" },
      { id: 3, label: "Current Episode" },
      { id: 4, label: "Total Seasons" },
      { id: 5, label: "Total Episodes" },
      { id: 6, label: "Genre" },
      { id: 7, label: "Delete" },
      { id: 8, label: "complete" },
    ],
  };
  render() {
    const { Movies, onDelete, onHandleEpisode } = this.props;
    if (Movies.length === 0)
      return (
        <Typography> Click the button below to add your series</Typography>
      );
    return (
      <div>
        <TableContainer styles={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.state.columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {Movies.map((movie) => (
                <TableRow key={movie._id}>
                  <TableCell>
                    <Link
                      to={`/movie/${movie._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {movie.name}
                    </Link>
                  </TableCell>

                  <TableCell>{movie.currentSeason}</TableCell>
                  <TableCell>{movie.currentEpisode}</TableCell>
                  <TableCell>{movie.numberOfSeasons}</TableCell>
                  <TableCell>{movie.numberOfEpisodes}</TableCell>
                  <TableCell>{movie.genre.name}</TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(movie)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => onHandleEpisode(movie)}
                    >
                      finish {movie.currentEpisode + 1}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
