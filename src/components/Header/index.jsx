import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppBar, Button, Grid, Toolbar, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { LOGIN_ROUTE } from '../../utils/consts';
import { getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import AddFilm from '../AddFilm/AddFilm';
import {
  logOutUserRequest,
  logOutUserResponce,
  logOutUserFailure
} from '../../store/actions/logOutUser';
import { isOpenAddCard } from '../../store/actions/films';
import { setNightTheme } from '../../store/actions/userSettings';
import { isFilter } from '../../store/actions/userSettings';

import './style.scss';

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.data);
  const nightTheme = useSelector(state => state.users.settings.appearance.nightTheme);
  const appearance = useSelector(state => state.users.settings.appearance);
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

  const handlerAddCard = () => {
    dispatch(isOpenAddCard());
  }

  const handlerFilter = () => {
    dispatch(isFilter());
  }

  useEffect(() => {
    if (nightTheme === null) return;

    const setData = async () => {
      await setDoc(doc(db, "users", user.uid), {
        settings: {
          appearance,
        },
        films: films,
      })
    }

    setData();

  }, [nightTheme]);

  return (

    <AppBar position="fixed" color={nightTheme ? "secondary" : "primary"}>
      <Toolbar variant='dense'>

        <AddFilm />

        <Grid container alignItems={"center"}>
          <Box m={0.5} className='avatar'>
            {(user.photoURL ?
              <img src={user.photoURL}
                alt={user.name ? user.name : "image"}
              />
              :
              null)}
          </Box>
          <Box m={0.5}>
            {user.name ? user.name : null}
          </Box>
        </Grid>
        <Grid>
          {user.name && <Fab
            color="primary"
            size='small'
            aria-label="add"
            onClick={handlerAddCard}>
              
            <AddIcon />
          </Fab>}
        </Grid>
        <Grid container justifyContent={"flex-end"}>
          <Box m={0.5}>
            <Button variant="outlined" color={nightTheme ? "primary" : "secondary"} onClick={handlerFilter}>
              <FilterAltIcon />
            </Button>
          </Box>
          <Box m={0.5}>
            <Button variant="outlined" color={nightTheme ? "primary" : "secondary"} onClick={changeTheme}>
              <Brightness2Icon />
            </Button>
          </Box>
          <Box m={0.5}>
            {
              (Object.values(user).length > 0) ?
                <Button onClick={logOut} color={nightTheme ? "primary" : "secondary"} variant={"outlined"}>Выйти</Button>
                :
                <NavLink to={LOGIN_ROUTE}>
                  <Button color={nightTheme ? "primary" : "secondary"} variant={"outlined"}>Войти</Button>
                </NavLink>
            }
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
