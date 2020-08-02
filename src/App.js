import React, { Component } from "react";
import Movie from "./component/Movie";
import { Route, Redirect } from "react-router-dom";
import Moviedetails from "./component/movieDetails";
import Register from "./component/register";
import Login from "./component/login";
import Navbar from "./component/Navbar";
import jwt from "jwt-decode";
import Logout from "./component/logout";
export default class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt(token);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <Navbar user={this.state.user} />
        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={(props) => <Login {...props} user={user} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/movie/:id" component={Moviedetails} />
        <Route
          path="/"
          exact
          render={(props) => {
            if (!user) return <Redirect to="/login" />;
            return <Movie {...props} />;
          }}
        />
      </div>
    );
  }
}
