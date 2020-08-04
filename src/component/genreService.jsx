import http from "./http";

export function submit(data) {
  return http.post(`/genres`, { name: data.genreName });
}
export function changeData(movie, movieId) {
  return http.put(`/movies/${movieId}`, {
    name: movie.name,
    currentSeason: movie.currentSeason,
    episode: movie.currentEpisode,
    episodesPerSeason: movie.numberOfEpisodes,
    seasons: movie.numberOfSeasons,
    genreId: movie.genre._id,
  });
}
export function userService(user) {
  return http.post(`/register`, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}
export function loginService(user) {
  return http.post(`/login`, {
    email: user.email,
    password: user.password,
  });
}
