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
import { Person, List } from '@material-ui/icons';

const style = {
  toolbar: {
    display: 'flex',
  },
  brand: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  title: {
    color: '#fff',
  },
  linkBtn: {
    color: '#fff',
  },
};

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
            <Person className={classes.linkBtn} />
          </IconButton>
        </Link>
        <Link to="/tasks">
          <IconButton>
            <List className={classes.linkBtn} />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(style)(Header);
