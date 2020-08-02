import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
// import GitHubIcon from "@material-ui/icons/GitHub";
import Joi from "joi-browser";
import Input from "./Input";
import { loginService } from "./genreService";
import { Redirect } from "react-router-dom";
import MyContacts from "./MyContacts";
const useStyles = (theme) => ({
  paper: {
    minHeight: "350px",
  },
  button: {
    marginTop: theme.spacing(3),
  },
});
class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  doSubmit = async () => {
    try {
      const { data } = await loginService(this.state.data);
      localStorage.setItem("token", data);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    const { errors, data } = this.state;
    const { user, classes } = this.props;
    if (user) return <Redirect to="/" />;
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Typography style={{ marginTop: "25px" }}>
                <Typography variant="h4">How it works</Typography>
                <ol variant="p">
                  <li>
                    <i>sign up or log in</i>
                  </li>
                  <li>
                    <i> Enter the new series</i>
                  </li>
                  <li>
                    <i> You can now manage your series lol :D </i>
                  </li>
                </ol>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <form onSubmit={this.handleSubmit}>
                <Typography variant="h4"> Login</Typography>
                <Input
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={this.handleChange}
                  type="email"
                  errors={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  value={data.password}
                  onChange={this.handleChange}
                  type="password"
                  errors={errors.password}
                />
                <div>
                  <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    size="small"
                    color="primary"
                  >
                    login
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <MyContacts />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default withStyles(useStyles)(Login);
