import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';


const Header = () => {

  const user = true;

  return (

    <AppBar color={"primary"} position="static">
      <Toolbar variant='dense'>
        <Grid container justifyContent={"flex-end"}>
          {
            user ? 
              <Button color={"secondary"} variant={"outlined"}>Logout</Button>
            : 
              <NavLink to={LOGIN_ROUTE}>
                  <Button color={"secondary"} variant={"outlined"}>Login</Button>
              </NavLink>
          }
          
          
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
