import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import { Person, List, Reply } from '@material-ui/icons';

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

const Header = ({ classes, isAuthenticated, onLogout, userId, isAdmin }) => (
  <div>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {isAuthenticated ? (
          <Link to="/" className={classes.brand}>
            <Button>
              <Typography variant="title" className={classes.title}>
                Task Manager
              </Typography>
            </Button>
          </Link>
        ) : (
          <Typography variant="title" className={classes.title}>
            Task Manager
          </Typography>
        )}
        {isAuthenticated && (
          <Fragment>
            <Link to="/profile">
              <IconButton>
                <Person className={classes.linkBtn} />
              </IconButton>
            </Link>
            {isAdmin ? (
              <Link to="/new-task">
                <IconButton>
                  <List className={classes.linkBtn} />
                </IconButton>
              </Link>
            ) : (
              <Link to={`/tasks/${userId}`}>
                <IconButton>
                  <List className={classes.linkBtn} />
                </IconButton>
              </Link>
            )}
            <IconButton onClick={onLogout}>
              <Reply className={classes.linkBtn} />
            </IconButton>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(style)(Header);
