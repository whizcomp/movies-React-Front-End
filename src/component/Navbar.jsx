import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, MenuItem, Box, Typography } from "@material-ui/core";
import { Switch, Link } from "react-router-dom";
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  links: {
    padding: theme.spacing(1),
    color: "white",
    textDecoration: "none",
  },
  align: {
    display: "flex",
    flexFlow: "row",
    alignContent: "flex-end",
  },
});
class Navbar extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <Box className={classes.root}>
        <Switch>
          <React.Fragment>
            <AppBar position="static">
              <Toolbar>
                <Typography style={{ flex: 1 }}>
                  <Link to="/" className={classes.links}>
                    Whiz Comp
                  </Link>
                </Typography>
                {!user && (
                  <div className={classes.align}>
                    <MenuItem>
                      <Link to="/register" className={classes.links}>
                        Register
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/login" className={classes.links}>
                        Login
                      </Link>
                    </MenuItem>
                  </div>
                )}
                {user && (
                  <React.Fragment>
                    <Link to="/logout" className={classes.links}>
                      Logout
                    </Link>
                    <Link to="/profile" className={classes.links}>
                      {" "}
                      {user.username}
                    </Link>
                  </React.Fragment>
                )}
              </Toolbar>
            </AppBar>
          </React.Fragment>
        </Switch>
      </Box>
    );
  }
}
export default withStyles(useStyles)(Navbar);
