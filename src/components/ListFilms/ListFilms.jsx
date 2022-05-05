import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Film from '../Film/Film';
import Grid from '@mui/material/Grid';
import { Button, FormControl, Select, MenuItem } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './style.css';

const ListFilms = () => {

  const films = useSelector((state) => state.users.films);
  const isFilter = useSelector((state) => state.users.settings.appearance.filter);

  const [category, setCategory] = useState('');
  const [ganre, setGanre] = useState('');
  const [sort, setSort] = useState(null);

  const hendlerSort = () => {

    setSort(
      films.filter(
        item => ((!category || item.category === category) && (!ganre || item.ganre === ganre)))
    );
  };

  const handlerReset = () => {
    setCategory('');
    setGanre('');
    setSort(null);
  }


  if (!films) {
    return <>'Ваших видео пока что нет'</>;
  }

  return (
    <>

      <Grid className={`filter-block ${isFilter ? 'active' : null} `} p={2} container spacing={2}>
        <Grid m={1}>
          <FormControl>
            <Select
              value={category}
              size="small"
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                Категория
              </MenuItem>
              <MenuItem value={"Фильмы"}>Фильмы</MenuItem>
              <MenuItem value={"Сериалы"}>Сериалы</MenuItem>
              <MenuItem value={"Мультфильмы"}>Мультфильмы</MenuItem>
              <MenuItem value={"Аниме"}>Аниме</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid m={1}>
          <FormControl>
            <Select
              size="small"
              value={ganre}
              fullWidth
              onChange={(e) => setGanre(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                Жанр
              </MenuItem>
              <MenuItem value={"Комедии"}>Комедии</MenuItem>
              <MenuItem value={"Драммы"}>Драммы</MenuItem>
              <MenuItem value={"Мелодраммы"}>Мелодраммы</MenuItem>
              <MenuItem value={"Боевики"}>Боевики</MenuItem>
              <MenuItem value={"Документальные"}>Документальные</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid m={1}>
          <Button
            color="secondary"
            variant={"outlined"}
            onClick={hendlerSort}
          >Фильтровать
            <FilterAltIcon />
          </Button>
        </Grid>

        <Grid m={1}>
          <Button
            color="secondary"
            variant={"outlined"}
            onClick={handlerReset}
          >Сбросить
            <RestartAltIcon />
          </Button>
        </Grid>

      </Grid>

      <Grid p={1} container spacing={2}>
        {
          sort ?
            sort.map((item, i) => {

              return (
                <Grid key={i} item pt={0} xs={12} sm={4} md={3} lg={2}>
                  <Film item={item} />
                </Grid>
              )
            })

            :

            films.map((item, i) => {

              return (
                <Grid key={i} item pt={0} xs={12} sm={4} md={3} lg={2}>
                  <Film item={item} />
                </Grid>
              )
            })
        }
      </Grid>
    </>
  );
}

export default ListFilms;
