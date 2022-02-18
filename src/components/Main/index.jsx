import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, getFirestore   } from "firebase/firestore"; 
import firebase from '../../firebase/firebase';
import { loadUserDataResponce } from '../../store/actions/loadUserData';
import ListFilms from '../ListFilms/ListFilms';
import AddFilm from '../AddFilm/AddFilm';
import { loadUserDataBaseResponce } from '../../store/actions/loadUserDataBase';

const Main = () => {
  
  const dispatch = useDispatch();
  
  const {auth} = firebase;
  const [user] = useAuthState(auth());
  const db = getFirestore();

  useEffect(async()=> {
    dispatch(loadUserDataResponce(user));
    console.log('useEffect', user);
    
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((user) => {
      dispatch(loadUserDataBaseResponce(user.data()))
      console.log(user.id, " ====> ", user.data());
    });

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
