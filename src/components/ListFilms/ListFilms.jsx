import React from 'react';
import { useSelector } from 'react-redux';

const ListFilms = () => {

  let films = useSelector((state) => state.users.films);

  return (
    <div>
        <h2>ListFilms</h2>
        <ul>
        {
          films.map((item, i) => {
            return(
              <li key={i}>
                Name: {item.name}
                {item.posterURL ? <img src={item.posterURL} width={50} height={50} alt="" /> : null}
              </li>
            )
          })
          
        }  
        </ul>
    </div>
  );
}

export default ListFilms;
