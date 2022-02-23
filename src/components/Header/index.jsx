import { AppBar, Button, Grid, Toolbar, Box } from '@mui/material';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import {
  logOutUserRequest,
  logOutUserResponce,
  logOutUserFailure
 } from '../../store/actions/logOutUser';
 import { setNightTheme } from '../../store/actions/userSettings';
 import './style.css';

const Header = () => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.isLoading); 
  const user = useSelector(state => state.data);
  const nightTheme = useSelector(state => state.users.settings.appearance.nightTheme);
  const gallery = useSelector(state => state.users.settings.appearance.gallery);
  const markup = useSelector(state => state.users.settings.appearance.markup);
  const films = useSelector((state) => state.users.films);

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

  const changeTheme = () => {
    dispatch(setNightTheme());
  }

  useEffect(()=>{
    if(nightTheme === null) return;

    const setData = async() => {
      await setDoc(doc(db, "users", user.uid), {
        settings: {
          appearance: {
            nightTheme: nightTheme,
            gallery: gallery,
            markup: markup
          },
        },
        films: films,
      })
    }

    setData();
     
  }, [nightTheme]);

  return (

    <AppBar color={nightTheme? "secondary" : "primary"} position="static">
      <Toolbar variant='dense'>
        <Grid>
        {isLoading ? <Loading /> : null}
        </Grid>
        <Grid container alignItems={"center"}>
          <Box className='avatar'>
            {(Object.values(user).length > 0) ? 
            <img src={user.photoURL ? user.photoURL : null}
                  alt={user.name ? user.name : "image"}
              />
            :
            null}
          </Box>
          <Box ml={1}>
            {user.name ? user.name : null}
          </Box>
        </Grid>
        <Grid container justifyContent={"flex-end"}>
          <Box mr={1}>
            <Button variant="outlined" color={nightTheme? "primary" : "secondary"} onClick={changeTheme}>
              <Brightness2Icon />
            </Button>
          </Box>
          {
            (Object.values(user).length > 0) ? 
              <Button onClick={logOut} color={nightTheme? "primary" : "secondary"} variant={"outlined"}>Logout</Button>
            : 
              <NavLink to={LOGIN_ROUTE}>
                  <Button color={nightTheme? "primary" : "secondary"} variant={"outlined"}>Login</Button>
              </NavLink>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
