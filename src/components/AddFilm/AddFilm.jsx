import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { setFilm } from '../../store/actions/films';
import { useDispatch, useSelector } from 'react-redux';

const AddFilm = () => {

  const dispatch = useDispatch();
  const films = useSelector((state) => state.users.films);
  const user = useSelector((state) => state.data);
  const [value, setValue] = useState('');

  const [image, setImage] = useState(null);
  
  const sendData = () => {
    const filmData = {
      name: 'deadpool',
      category: "films",
      genre: "comedy",
      imageURL: "http://fire...",
      rating: 2,
      year: 1999,
      id:1,
    }
    dispatch(setFilm(filmData));
  }

  useEffect(()=>{
    if(!films.length) return;

    const setData = async() => {
      await setDoc(doc(db, "users", user.uid), {
        settings: {
          appearance: {
            nightTheme: false,
            gallery: 'slider',
            markup: 'list'
          },
        },
        films: films,
      })
    }

    setData();
     
  }, [films]);

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
