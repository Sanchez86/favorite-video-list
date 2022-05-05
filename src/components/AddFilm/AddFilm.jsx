import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, Typography, Rating, FormControl, Select, MenuItem } from '@mui/material';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from '../../firebase/firebase';
import { setFilm, isOpenAddCard } from '../../store/actions/films';
import nanoid from 'nanoid';
import PosterLoad from '../PosterLoad';
import './style.css';

const AddFilm = () => {

  const [loading, setLoading] = useState(true);

  function handleClick() {
    setLoading(!loading);
    setImage(null);
  }

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const films = useSelector((state) => state.users.films);
  const user = useSelector((state) => state.data);

  const userSettings = useSelector(state => state.users.settings);

  const isOpen = useSelector((state) => state.isOpenAddCard);

  const [name, setName] = useState('');
  const [filmURL, setFilmURL] = useState('');
  const [category, setCategory] = useState('');
  const [ganre, setGanre] = useState('');
  const [year, setYear] = useState(1999);
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const storage = getStorage();

  const hendlerReset = () => {
    setName('');
    setFilmURL('');
    setYear(1999);
    setRating(1);
    setCategory('');
    setGanre('');
    setImage(null);
    setCustomImageUrl('');
  }

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
                customImageUrl
              }

              return filmData;

            }).then((filmData) => {

              dispatch(setFilm(filmData));
              setIsSuccess(true);
              setTimeout(() => { dispatch(isOpenAddCard()) }, 2000);
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
        customImageUrl
      }

      dispatch(setFilm(filmData));
      setIsSuccess(true);
      setTimeout(() => { dispatch(isOpenAddCard()) }, 2000);
    }
  }

  useEffect(() => {
    if (!films.length) return;

    const setData = async () => {
      await setDoc(doc(db, "users", user.uid), {
        settings: userSettings,
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
    setCustomImageUrl('');

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(false)
    }, 2000);

  }, [films]);

  return (
    <div className={`add-film ${isOpen ? 'active' : null}`}>
      <Box mt={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <FormControl>
            <Select
              style={{ width: '100%', marginBottom: '15px' }}
              value={category}
              size="small"
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Категория
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
              onChange={(e) => setGanre(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Жанр
              </MenuItem>
              <MenuItem value={"Комедии"}>Комедии</MenuItem>
              <MenuItem value={"Драммы"}>Драммы</MenuItem>
              <MenuItem value={"Мелодраммы"}>Мелодраммы</MenuItem>
              <MenuItem value={"Боевики"}>Боевики</MenuItem>
              <MenuItem value={"Документальные"}>Документальные</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          label={`Ссылка на ${name}`}
          fullWidth
          size="small"
          variant={"outlined"}
          value={filmURL}
          name={"setFilmURL"}
          onChange={e => setFilmURL(e.target.value)}
        />
      </Box>
      <Box mt={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box component="fieldset" mb={1} borderColor="transparent">
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
            size="small"
            label="Год"
            type="number"
            variant={"outlined"}
            value={year}
            name={"setYear"}
            onChange={e => setYear(e.target.value)}
          />
        </Box>
      </Box>

      <PosterLoad
        image={image}
        loading={loading}
        customImageUrl={customImageUrl}
        handleClick={handleClick}
        setCustomImageUrl={setCustomImageUrl}
        handleChange={handleChange}
      />

      <Box mt={2} display={'flex'} justifyContent={'space-between'}>
        <Button
          className='btn-reset'
          color="secondary"
          variant={"outlined"}
          onClick={hendlerReset}>
          Очистить &nbsp;
          <RestartAltIcon />
        </Button>

        <Button
          className='btn-send'
          onClick={sendData}
          variant={'outlined'}
          color={"secondary"}
          disabled={!name ? true : isLoading ? isLoading : false}
        >

          {isSuccess ?
            <>
              <PublishedWithChangesIcon className='isSuccess' />
              <p>Успешно добавлено</p>
            </>
            : !isLoading ? <>Добавить&nbsp; <SendIcon /></> : 'Отправляется...'}
        </Button>
      </Box>

    </div >

  );
}

export default AddFilm;
