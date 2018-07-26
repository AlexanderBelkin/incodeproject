import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import { Person, List, PlaylistAdd, ExitToApp } from '@material-ui/icons';

import './style.css';

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
};

const Header = ({ classes, isAuthenticated, onLogout, userId, isAdmin }) => (
  <div>
    <AppBar position="static" className="navbar">
      <Toolbar className={classes.toolbar}>
        {isAuthenticated ? (
          <div className={classes.brand}>
            <Link to="/">
              <Button>
                <Typography variant="title" className={classes.title}>
                  Task Manager
                </Typography>
              </Button>
            </Link>
          </div>
        ) : (
          <Typography variant="title" className={classes.title}>
            Task Manager
          </Typography>
        )}
        {isAuthenticated && (
          <Fragment>
            <Link to="/profile">
              <Button className="rightButton">
                <Person />
                <span className="text">Profile</span>
              </Button>
            </Link>
            {isAdmin ? (
              <Link to="/new-task">
                <Button className="rightButton">
                  <PlaylistAdd />
                  <span className="text">New Task</span>
                </Button>
              </Link>
            ) : (
              <Link to={`/tasks/${userId}`}>
                <Button className="rightButton">
                  <List />
                  <span className="text">Your Tasks</span>
                </Button>
              </Link>
            )}
            <Button onClick={onLogout} className="rightButton">
              <ExitToApp />
              <span className="text">Logout</span>
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(style)(Header);
