import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/firebase';
import { loadUserDataResponce } from '../../store/actions/loadUserData';
import ListFilms from '../ListFilms/ListFilms';
import AddFilm from '../AddFilm/AddFilm';

const Main = () => {
  console.log('Main');
  const dispatch = useDispatch();
  const {auth} = firebase;
  const [user] = useAuthState(auth());

  useEffect(()=> {
    dispatch(loadUserDataResponce(user));
    console.log('useEffect');
  }, []);


  return (
    <>
      <h2>Main</h2>
      <AddFilm />
      <ListFilms />
    </>
  );
}

export default Main;
