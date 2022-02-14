import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import {
  logOutUserRequest,
  logOutUserResponce,
  logOutUserFailure
 } from '../../store/actions/logOutUser'

const Header = () => {

  const dispatch = useDispatch();

  const {auth, firestore} = useContext(Context);

  const [user] = useAuthState(auth);

  const isLoading = useSelector(state => state.isLoading); 
  const userName = useSelector(state => state.data.data);

  if(userName){
    console.log('--', userName._delegate.displayName);
  }

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
        <Grid container>
          {userName ? userName._delegate.displayName : null}
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
