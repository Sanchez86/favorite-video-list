import React, { useEffect } from 'react';
import { Rating, Button } from '@mui/material';
import './style.css';

const Film = ({ item }) => {

  const name = item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name;

  return (
    <div className='card'>
      <div className="card-hover">
        {item.posterURL ? <img src={item.posterURL} width={50} height={50} alt={item.name} /> : null}

        <div className='card-content'>
          <button className='card-element'>{item.category}</button>
          <button className='card-element'>{item.ganre}</button>

          <button className='card-element' readOnly>{item.year}</button>

          <Rating value={item.rating} size="small" readOnly className="card-stars" />
          <Button
            href={item.filmURL}
            target='_blank'
            variant={'outlined'}
            size="small"
            cursor='pointer'
            color={"primary"}>Смотреть</Button>
        </div>
      </div>
      <a className='card-link' href={item.filmURL} target='_blank'>
        {name}
      </a>

    </div>
  );
}

export default Film;
