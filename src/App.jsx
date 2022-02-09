import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter/AppRouter';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Header />
        <AppRouter />
        </BrowserRouter>
      </ThemeProvider>  
    </div>
  );
}

export default App;
