import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

import styles from './styles';

const Header = ({ classes }) => (
  <div>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.brand}>
          <Button>
            <Typography variant="title" className={classes.title}>
              Task Manager
            </Typography>
          </Button>
        </Link>
        <Link to="/profile">
          <IconButton>
            <AccountIcon className={classes.profileBtn} />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Header);
