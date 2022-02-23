import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography, Rating, FormControl, Select, MenuItem } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from '../../firebase/firebase';
import { setFilm } from '../../store/actions/films';
import { useDispatch, useSelector } from 'react-redux';

const AddFilm = () => {

  const dispatch = useDispatch();
  const films = useSelector((state) => state.users.films);
  const user = useSelector((state) => state.data);

  const nightTheme = useSelector(state => state.users.settings.appearance.nightTheme);
  const gallery = useSelector(state => state.users.settings.appearance.gallery);
  const markup = useSelector(state => state.users.settings.appearance.markup);

  const [name, setName] = useState('');
  const [filmURL, setFilmURL] = useState('');
  const [category, setCategory] = useState('');
  const [ganre, setGanre] = useState('');
  const [year, setYear] = useState(1999);
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  
  const storage = getStorage();

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  
  const sendData = () => {

    const storageRef = ref(storage, image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_change",
      snapshot => {},
      error => {
        console.log('error', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {

          const filmData = {
            name,
            category,
            ganre,
            filmURL,
            posterURL: url,
            rating,
            year,
            id:1,
          }
          dispatch(setFilm(filmData));

        })
      }
    )

  }

  useEffect(()=>{
    if(!films.length) return;

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

    setName('');
    setFilmURL('');
    setYear(1999);
    setRating(1);
    setCategory('');
    setGanre('');
    setImage(null);
     
  }, [films]);

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };
  const changeGanre = (event) => {
    setGanre(event.target.value);
  };
  
  return (
    <div>
      <Box>
        <FormControl>
          <Select
            value={category}
            onChange={changeCategory}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
            Set category
            </MenuItem>
            <MenuItem value={"Фильмы"}>Фильмы</MenuItem>
            <MenuItem value={"Сериалы"}>Сериалы</MenuItem>
            <MenuItem value={"Мультфильмы"}>Мультфильмы</MenuItem>
            <MenuItem value={"Аниме"}>Аниме</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <Select
            value={ganre}
            onChange={changeGanre}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
            Set ganre
            </MenuItem>
            <MenuItem value={"Комедии"}>Комедии</MenuItem>
            <MenuItem value={"Драммы"}>Драммы</MenuItem>
            <MenuItem value={"Мелодраммы"}>Мелодраммы</MenuItem>
            <MenuItem value={"Боевики"}>Боевики</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
            label="Film name"
            fullWidth
            variant={"outlined"}
            value={name}
            name={"film-name"}
            onChange={e => setName(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
            label="URL for poster"
            fullWidth
            variant={"outlined"}
            value={filmURL}
            name={"setFilmURL"}
            onChange={e => setFilmURL(e.target.value)}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box>
      <TextField
            label="Year"
            type="number"
            variant={"outlined"}
            value={year}
            name={"setYear"}
            onChange={e => setYear(e.target.value)}
        />
      </Box>
      <Box>
        <input required type="file" onChange={handleChange} />
      </Box>
      {
        (name === '' || filmURL === '' || category === '' || ganre === '' ||
          year <= 0 || rating === 1 || image === null) ?
            null
          :
            <Button onClick={sendData}>Send</Button>
          
      }
      
    </div>

  );
}

export default AddFilm;
