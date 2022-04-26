import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';


export default function CircularIndeterminate() {
  return (
    <div className='circular-progress'>
      <CircularProgress />
    </div>
  );
}