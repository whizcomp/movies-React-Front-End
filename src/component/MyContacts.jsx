import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function MyContacts() {
  const media = [
    {
      id: "1",
      name: "github",
      link: "https://github.com/whizcomp",
      icon: <GitHubIcon color="primary" fontSize="large" />,
    },
    {
      id: "2",
      name: "linkedin",
      link: "https://linkedin.com/in/victor-kipkoech-391471172",
      icon: <LinkedInIcon color="primary" fontSize="large" />,
    },
    {
      id: "3",
      name: "Twitter",
      link: "https://twitter.com/whizcomp",
      icon: <TwitterIcon color="primary" fontSize="large" />,
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.icons}>
      <IconButton>
        {media.map((media) => (
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <a rel="noopener noreferrer" href={media.link} target="_blank">
              {media.icon}
            </a>
          </li>
        ))}
      </IconButton>
    </div>
  );
}
