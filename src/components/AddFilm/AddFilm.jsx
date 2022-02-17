import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { doc, setDoc, getFirestore   } from "firebase/firestore"; 
import firebase from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setFilm } from '../../store/actions/films';
import { useDispatch } from 'react-redux';

let films = {} // все фильмы из стора


const AddFilm = () => {
  console.log('Films');

  const {auth} = firebase;
  const [user] = useAuthState(auth());
  console.log('user11', user.uid);


  const [value, setValue] = useState('');

  const [image, setImage] = useState(null);
  const db = getFirestore();
  
  const sendData = async () => {
    const filmData = {
      name: 'batman',
      category: "films",
      genre: "comedy",
      imageURL: "http://fire...",
      rating: 2,
      year: 1999,
      id:1,
    }
    useDispatch(setFilm(filmData));
    // await setDoc(doc(db, "users", user.uid), {
    //   settings: {
    //     appearance: {
    //       nightTheme: false,
    //       gallery: 'slider',
    //       markup: 'list'
    //     },
    //   },
    //   films: films,
      
    // })

  }

  const handleChange = (e) => {
    // if(e.target.files[0]){
    //   setImage(e.target.files[0]);
    // }
  }
  
  return (

    <div>
      <TextField
          fullWidth
          variant={"outlined"}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        <Button onClick={sendData}>Send</Button>
    </div>

  );
}

export default AddFilm;
