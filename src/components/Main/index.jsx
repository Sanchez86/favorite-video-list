import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import {
  loadUserDataRequest,
  loadUserDataResponce,
  loadUserDataFailure
} from '../../store/actions/loadUserData';

const Main = () => {
  const dispatch = useDispatch();
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth);

  useEffect(()=> {
    dispatch(loadUserDataResponce(user));
    console.log('useEffect');
  }, []);


  return <div>Main</div>;
}

export default Main;
