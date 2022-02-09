import Context from '@mui/base/TabsUnstyled/TabsContext';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';
import './style.css';


const Login = () => {

  const {auth} = useContext(Context);

  const login = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);
    console.log('user', user);
  }

  return (
    <div className='login'>
      <div>Login</div>
      <Button variant={'outlined'} onClick={login} >Войти с помощью Google</Button>
    </div>
  );
}

export default Login;
