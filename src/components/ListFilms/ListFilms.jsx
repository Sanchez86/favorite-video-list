import React from 'react';
import { useSelector } from 'react-redux';
import Film from '../Film/Film';

const ListFilms = () => {

  let films = useSelector((state) => state.users.films);

  return (
    <div>
        <div className='cards'>
          {
            films.map((item, i) => {
              return(
                <Film key={i} item={item} />
              )
            })
          }
        </div>
    </div>
  );
}

export default ListFilms;
