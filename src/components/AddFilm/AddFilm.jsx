import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, Typography, Rating, FormControl, Select, MenuItem } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from '../../firebase/firebase';
import { setFilm, isOpenAddCard } from '../../store/actions/films';
import nanoid from 'nanoid';
import './style.css';

const AddFilm = () => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const films = useSelector((state) => state.users.films);
  const user = useSelector((state) => state.data);

  const nightTheme = useSelector(state => state.users.settings.appearance.nightTheme);
  const gallery = useSelector(state => state.users.settings.appearance.gallery);
  const markup = useSelector(state => state.users.settings.appearance.markup);

  const isOpen = useSelector((state) => state.isOpenAddCard);

  const [name, setName] = useState('');
  const [filmURL, setFilmURL] = useState('');
  const [category, setCategory] = useState('');
  const [ganre, setGanre] = useState('');
  const [year, setYear] = useState(1999);
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);

  const storage = getStorage();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const sendData = () => {
    setIsLoading(true);

    if (image) {
      const storageRef = ref(storage, image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_change",
        snapshot => { },
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
                id: nanoid(),
              }

              return filmData;

            }).then((filmData) => {

              dispatch(setFilm(filmData));
              dispatch(isOpenAddCard());
            })
        }
      )
    } else {
      const filmData = {
        name,
        category,
        ganre,
        filmURL,
        posterURL: '',
        rating,
        year,
        id: nanoid(),
      }

      dispatch(setFilm(filmData));
      dispatch(isOpenAddCard());
    }
  }

  useEffect(() => {
    if (!films.length) return;

    const setData = async () => {
      await setDoc(doc(db, "users", user.uid), {
        settings: {
          appearance: {
            nightTheme: nightTheme,
            gallery: gallery,
            markup: markup
          },
        },
        films: films,
      }).then(() => setIsLoading(false));
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
    <div className={`add-film ${isOpen ? 'active' : null}`}>
      <Box>
        <FormControl>
          <Select
            style={{ width: '100%', marginBottom: '15px' }}
            value={category}
            size="small"
            fullWidth
            onChange={changeCategory}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Выберете категорию
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
            style={{ width: '100%', marginBottom: '15px' }}
            size="small"
            value={ganre}
            fullWidth
            onChange={changeGanre}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Выберете жанр
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
          required
          style={{ marginBottom: '15px' }}
          size="small"
          label="Название"
          fullWidth
          variant={"outlined"}
          value={name}
          name={"film-name"}
          onChange={e => setName(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          style={{ marginBottom: '15px' }}
          label={`Ссылка на ${category}`}
          fullWidth
          size="small"
          variant={"outlined"}
          value={filmURL}
          name={"setFilmURL"}
          onChange={e => setFilmURL(e.target.value)}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Рейтинг</Typography>
        <Rating
          style={{ width: '100%', marginBottom: '15px' }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box>
        <TextField
          style={{ width: '100%', marginBottom: '15px' }}
          size="small"
          label="Год"
          type="number"
          variant={"outlined"}
          value={year}
          name={"setYear"}
          onChange={e => setYear(e.target.value)}
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          component="label"
          className='btn-upload'
        >
          Загрузить постер
          <input
            type="file"
            required
            hidden
            onChange={handleChange}
          />
        </Button>
      </Box>

      {
        (name === '') ?
          null
          :
          <Button
            className='btn-send'
            style={{ marginTop: '15px' }}
            onClick={sendData}
            variant={'outlined'}
            color={"secondary"}
            disabled={isLoading}
          >
            {!isLoading ? 'Добавить' : 'Отправляется...'}
          </Button>

      }

    </div>

  );
}

export default AddFilm;
