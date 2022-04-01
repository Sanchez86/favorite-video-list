import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter/AppRouter';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Footer from './components/Footer/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      dark: '#161b22',
    },
    secondary: {
      main: '#000000',
      dark: '#f0f6fcb3',
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
        <Footer/>
        </BrowserRouter>
      </ThemeProvider>  
    </div>
  );
}

export default App;
