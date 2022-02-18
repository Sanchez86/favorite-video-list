import { Button } from '@mui/material';
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {
  loadUserDataRequest,
  loadUserDataResponce,
  loadUserDataFailure
} from '../../store/actions/loadUserData';
import './style.css';

const Login = () => {

  const dispatch = useDispatch();

  const login = async () => {

    dispatch(loadUserDataRequest());

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        
        dispatch(loadUserDataResponce(user)); 
        console.log('user', user);
       
      }).catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        
        dispatch(loadUserDataFailure(error));
        console.log('error', error);
      });

  }

  return (
    <div className='login'>
      <div>Login</div>
      <Button onClick={login} variant={'outlined'} >Enter with help Google</Button>
    </div>
  );
}

export default Login;
