import React, { Component } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Input from "./Input";
import { userService } from "./genreService";
import Joi from "joi-browser";
import MyContacts from "./MyContacts";
const useStyles = (theme) => ({
  form: {
    paddingLeft: "15px",
  },
  paper: {
    minHeight: "350px",
  },
  button: {
    marginTop: theme.spacing(3),
  },
});
class Register extends Component {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(3).max(55).required(),
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
      const { data } = await userService(this.state.data);
      localStorage.setItem("token", data);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.data };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    const { errors, data } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} md={12} lg={8} className={classes.form}>
              <form onSubmit={this.handleSubmit}>
                <Typography variant="h4"> Register</Typography>
                <Input
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={this.handleChange}
                  type="email"
                  errors={errors.email}
                />
                <Input
                  label="Username"
                  name="username"
                  value={data.username}
                  onChange={this.handleChange}
                  type="text"
                  errors={errors.username}
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
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MyContacts />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default withStyles(useStyles)(Register);
