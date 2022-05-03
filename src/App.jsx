import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from './auth';
import './App.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter/AppRouter';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Footer from './components/Footer/Footer';
import CircularIndeterminate from './components/Loading';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      dark: '#161b22',
    },
    secondary: {
      main: '#2d333b',
      dark: '#f0f6fcb3',
    }
  },
});

function App() {
  const nightTheme = useSelector(state => state.users.settings.appearance.nightTheme);
  const isLoading = useSelector(state => state.isLoading);
  const user = useAuth();

  return (
    <div className={`App ${nightTheme ? 'night-theme' : null}`}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>


          {isLoading && <CircularIndeterminate />}

          {!isLoading && (<>

            {user && <Header />}

            <AppRouter user={user} />
            <Footer />

          </>)}


        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
