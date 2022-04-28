import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rating, Button } from '@mui/material';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { delateFilm } from '../../store/actions/films';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css';

const Film = ({ item }) => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.data);
  const films = useSelector((state) => state.users.films);

  const onDelete = async () => {

    const newFilms = films.filter((film) => film.id !== item.id);
    const userRef = doc(db, 'users', user.uid);

    await updateDoc(userRef, { films: newFilms })
      .then((e) => dispatch(delateFilm(newFilms)))
      .catch((e) => console.log('Error', e));
  }

  const name = item?.name?.length > 15 ? item?.name.slice(0, 15) + '...' : item?.name;

  return (
    <div className='card'>
      <div className="card-hover">
        {item.posterURL ? <img src={item.posterURL} width={50} height={50} alt={item.name} /> : null}

        <div className='card-content'>
          {item.category && <button className='card-element'>{item.category}</button>}
          {item.ganre && <button className='card-element'>{item.ganre}</button>}

          {item.year && <button className='card-element' readOnly>{item.year}</button>}

          <Button
            style={{ marginTop: '15px' }}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
          >
            Удалить
          </Button>

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
