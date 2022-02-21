import React, { useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, getFirestore   } from "firebase/firestore"; 
import firebase from '../../firebase/firebase';
import ListFilms from '../ListFilms/ListFilms';
import AddFilm from '../AddFilm/AddFilm';
import { loadUserDataBaseResponce } from '../../store/actions/loadUserDataBase';

const Main = () => {
  
  // const {auth} = firebase;
  // const [user] = useAuthState(auth());
  //const db = getFirestore();

  // useEffect(async()=> {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((user) => {
  //     dispatch(loadUserDataBaseResponce(user.data()))
  //   });

  // }, []);


  return (
    <>
      <h2>Main</h2>
      <AddFilm />
      <ListFilms />
    </>
  );
}

export default Main;
