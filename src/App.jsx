import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter/AppRouter';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Footer from './components/Footer/Footer';
import CircularIndeterminate from './components/Loading';
import useAuth from './auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      dark: '#161b22',
    },
    secondary: {
      main: '#000000',
      dark: '#f0f6fcb3',
    }
  },
});

function App() {
  const isLoading = useSelector(state => state.isLoading);
  const user = useAuth();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>

          {isLoading && <CircularIndeterminate />}

          {!isLoading && (<>
            <Header />
            <AppRouter user={user} />
            <Footer />
          </>)}


        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
