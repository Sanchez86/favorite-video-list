import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import Loading from '../Loading';

const Header = () => {

  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);

  const isLoading = useSelector(state => state.isLoading);
    
  // const useData = JSON.parse(localStorage.getItem('user'));
  // const photoURL = useData.photoURL;
  // console.log('photoURL', photoURL);

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
        <Grid>
        {isLoading ? <Loading /> : null}
        </Grid>
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
