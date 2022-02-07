import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter/AppRouter';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <AppRouter />
      </BrowserRouter>  
    </div>
  );
}

export default App;
