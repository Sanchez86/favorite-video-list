import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { updateFilm } from '../../store/actions/films';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Container from '@mui/material/Container';
import { Button, TextField, Box, Typography, Rating, FormControl, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import PosterLoad from '../PosterLoad';
import './style.css';

const Edit = ({ match }) => {
    const history = useHistory();
    const storage = getStorage();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.data);
    const userSettings = useSelector(state => state.users.settings);

    const films = useSelector((state) => state.users.films);
    const film = films.find((film) => film.id === match.params.id);

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(film.name);
    const [filmURL, setFilmURL] = useState(film.filmURL);
    const [category, setCategory] = useState(film.category);
    const [ganre, setGanre] = useState(film.ganre);
    const [year, setYear] = useState(film.year);
    const [rating, setRating] = useState(film.rating);
    const [image, setImage] = useState(film.posterURL);
    const [customImageUrl, setCustomImageUrl] = useState(film.customImageUrl);

    console.log('film', film);

    const [isSuccess, setIsSuccess] = useState(false);

    function handleClick() {
        setLoading(!loading);
        setImage(null);
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const setData = async () => {

        const userRef = doc(db, 'users', user.uid);

        await updateDoc(userRef, {
            settings: userSettings,
            films: films,
        })
            .then((e) => {
                setIsLoading(false);
                setIsSuccess(true);
                setTimeout(() => {
                    history.push("/main");
                }, 1500);
            })
            .catch((e) => console.log('Error in update', e));
    }

    const handlerEdit = () => {

        setIsLoading(true);

        if (typeof image === 'object') {

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
                                id: film.id,
                                customImageUrl: ''
                            }

                            return filmData;

                        }).then((filmData) => {

                            dispatch(updateFilm(filmData));
                            setData();
                        })
                }
            )
        } else {
            const filmData = {
                name,
                category,
                ganre,
                filmURL,
                posterURL: image,
                rating,
                year,
                id: film.id,
                customImageUrl
            }

            dispatch(updateFilm(filmData));
            setData();
        }
    }

    console.log('customImageUrl', customImageUrl);

    return (
        <Container className='edit-film'>
            <Grid container spacing={{ xs: 2, md: 3 }}>

                <Grid item xs={12} sm={4} md={4}>

                    <PosterLoad
                        image={image}
                        loading={loading}
                        customImageUrl={customImageUrl}
                        handleClick={handleClick}
                        setCustomImageUrl={setCustomImageUrl}
                        handleChange={handleChange}
                    />
                    <br />
                    {image ? typeof (image) === 'string' ?
                        <Box className='edit-poster'><img src={image} alt={name} /></Box>
                        :
                        `Имя файла: ${image.name}`
                        :
                        null}

                    {customImageUrl && customImageUrl.length > 0 ? <Box className='edit-poster'><img src={customImageUrl} alt={name} /></Box> : null}
                </Grid>

                <Grid item xs={12} sm={8} md={8}>

                    <Box>
                        <FormControl>
                            <Select
                                style={{ width: '100%', marginBottom: '15px' }}
                                value={category}
                                size="small"
                                fullWidth
                                displayEmpty
                                onChange={(e) => setCategory(e.target.value)}
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
                                displayEmpty
                                onChange={(e) => setGanre(e.target.value)}
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
                    <Box className='wrap-clear'>
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
                        <ClearIcon
                            className='btn-clear'
                            onClick={() => setName('')}
                        />
                    </Box>
                    <Box className='wrap-clear'>
                        <TextField
                            style={{ marginBottom: '15px' }}
                            label={`Ссылка на ${film.category ? film.category : ''}`}
                            fullWidth
                            size="small"
                            variant={"outlined"}
                            value={filmURL}
                            name={"setFilmURL"}
                            onChange={e => setFilmURL(e.target.value)}
                        />
                        <ClearIcon
                            className='btn-clear'
                            onClick={() => setFilmURL('')}
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
                    <Box className='edit-film-footer'>
                        <Box m={2}>
                            <Link to="/main" className='back' >
                                <ArrowBackIcon />
                                Назад
                            </Link>
                        </Box>

                        {name ?

                            <Button
                                variant="contained"
                                component="label"
                                className='btn btn-edit'
                                onClick={handlerEdit}
                                disabled={isLoading}
                            >

                                {
                                    isSuccess ?
                                        <>
                                            <PublishedWithChangesIcon className='isSuccess' />
                                            <p>Успешно обновлено</p>
                                        </>
                                        :
                                        !isLoading ?
                                            <p>Сохранить изменения</p>
                                            :
                                            'Изменения сохраняются...'
                                }

                            </Button>

                            : null}


                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Edit;