import React from 'react';
import { useSelector } from 'react-redux';
import Film from '../Film/Film';
import Grid from '@mui/material/Grid';

const ListFilms = () => {

  let films = useSelector((state) => state.users.films);

  if (!films) {
    return <>'Ваших видео пока что нет'</>;
  }

  return (
    <Grid container spacing={2}>
      {
        films.map((item, i) => {

          return (
            <Grid key={i} item pt={0} xs={12} sm={4} md={3} lg={2}>
              <Film item={item} />
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default ListFilms;
