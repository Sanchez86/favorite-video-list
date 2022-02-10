import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import { getAuth, signOut } from "firebase/auth";

const Header = () => {

  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  console.log('user', user);
  console.log('firestore', firestore);

  const logOut = async () => {

    const auth = getAuth();
      signOut(auth).then(() => {
        console.log('Sign-out successful');
        
      }).catch((error) => {
        console.log('An error happened.');
      });

  }

  return (

    <AppBar color={"primary"} position="static">
      <Toolbar variant='dense'>
        <Grid container justifyContent={"flex-end"}>
          {
            user ? 
              <Button onClick={logOut} color={"secondary"} variant={"outlined"}>Logout</Button>
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
