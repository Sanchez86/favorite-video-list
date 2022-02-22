import React from 'react';
import { useSelector } from 'react-redux';

const ListFilms = () => {
  console.log('ListFilms');

  let films = useSelector((state) => state.users.films);
  console.log('films', films);

  return (
    <div>
        <h2>ListFilms</h2>
        <ul>
        {
          films.map((item, i) => {
            return(
              <li key={i}>Name: {item.name}</li>
            )
          })
          
        }  
        </ul>
    </div>
  );
}

export default ListFilms;
