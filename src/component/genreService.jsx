import http from "./http";
import { apiUrl } from "./config.json";
const endpoint = apiUrl;
export function submit(data) {
  return http.post(`${endpoint}/genres`, { name: data.genreName });
}
export function changeData(movie, movieId) {
  return http.put(`${endpoint}/movies/${movieId}`, {
    name: movie.name,
    currentSeason: movie.currentSeason,
    episode: movie.currentEpisode,
    episodesPerSeason: movie.numberOfEpisodes,
    seasons: movie.numberOfSeasons,
    genreId: movie.genre._id,
  });
}
export function userService(user) {
  return http.post(`${endpoint}/register`, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}
export function loginService(user) {
  return http.post(`${endpoint}/login`, {
    email: user.email,
    password: user.password,
  });
}
