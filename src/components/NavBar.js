import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" component="h3" color="inherit">
            Weather Service Dashboard - R. Forman
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;