import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';


export default function CircularIndeterminate() {
  return (
    <div className='circular-progress'>
      <CircularProgress />
    </div>
  );
}