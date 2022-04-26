import React from 'react';
import { useSelector } from 'react-redux';
import Film from '../Film/Film';
import Grid from '@mui/material/Grid';

const ListFilms = () => {

  let films = useSelector((state) => state.users.films);

  return (
    <Grid container spacing={2}>

      {
        films.map((item, i) => {
          return (
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Film key={i} item={item} />
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default ListFilms;
