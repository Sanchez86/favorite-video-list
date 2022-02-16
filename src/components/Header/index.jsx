import { AppBar, Button, Grid, Toolbar, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
import firebase from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import {
  logOutUserRequest,
  logOutUserResponce,
  logOutUserFailure
 } from '../../store/actions/logOutUser';
 import './style.css';

const Header = () => {
  console.log('Header');

  const dispatch = useDispatch();

  const {auth} = firebase;
  const [user] = useAuthState(auth());

  const isLoading = useSelector(state => state.isLoading); 
  const userName = useSelector(state => state.data.data);

  const logOut = async () => {

    dispatch(logOutUserRequest());

    const auth = getAuth();
      signOut(auth).then(() => {
        dispatch(logOutUserResponce());
        console.log('Sign-out successful');
        
      }).catch((error) => {
        dispatch(logOutUserFailure(error));
        console.log('An error happened.');
      });

  }

  return (

    <AppBar color={"primary"} position="static">
      <Toolbar variant='dense'>
        <Grid>
        {isLoading ? <Loading /> : null}
        </Grid>
        <Grid container alignItems={"center"}>
          <Box className='avatar'>
            {userName ? 
            <img src={userName ? userName._delegate.photoURL : null}
                  alt={userName ? userName._delegate.displayName : "image"}
              />
            :
            null}
          </Box>
          <Box ml={1}>
            {userName ? userName._delegate.displayName : null}
          </Box>
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
