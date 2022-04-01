import React from 'react';
import ListFilms from '../ListFilms/ListFilms';
import AddFilm from '../AddFilm/AddFilm';


const Main = () => {
  
  return (
    <div className="container">
      <br/>
      <AddFilm />
      <ListFilms />  
    </div>
  );
}

export default Main;
