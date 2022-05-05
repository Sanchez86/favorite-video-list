import { createReducer } from '@reduxjs/toolkit';

import { loading, createDocRef } from '../actions';

import {
  loadUserDataRequest,
  loadUserDataResponce,
  loadUserDataFailure,
} from '../actions/loadUserData';

import {
  logOutUserRequest,
  logOutUserResponce,
  logOutUserFailure
} from '../actions/logOutUser';

import {
  loadUserDataBaseRequest,
  loadUserDataBaseResponce,
  loadUserDataBaseFailure
} from '../actions/loadUserDataBase';

import {
  setFilm,
  delateFilm,
  isOpenAddCard,
  updateFilm
} from '../actions/films';

import {
  setNightTheme,
  isFilter
} from '../actions/userSettings';

const initialState = {
  isOpenAddCard: false,
  data: {},
  isLoading: true,
  error: '',
  users: {
    settings: {
      appearance: {
        nightTheme: null,
        gallery: 'slider',
        markup: 'list',
        filter: false
      },
    },
    films: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isFilter, (state) => {
      state.users.settings.appearance.filter = !state.users.settings.appearance.filter;
    })
    .addCase(updateFilm, (state, action) => {
      const itemIndex = state.users.films.findIndex(film => film.id === action.payload.id);
      const updatedFilms = [
        ...state.users.films.slice(0, itemIndex),
        action.payload,
        ...state.users.films.slice(itemIndex + 1),
      ];
      state.users.films = updatedFilms;
    })

    .addCase(isOpenAddCard, (state) => {
      state.isOpenAddCard = !state.isOpenAddCard;
    })

    .addCase(delateFilm, (state, action) => {
      state.users.films = action.payload;
    })

    .addCase(loading, (state, action) => {
      state.isLoading = action.payload;
    })

    .addCase(setNightTheme, (state) => {
      state.users.settings.appearance.nightTheme = !state.users.settings.appearance.nightTheme;
    })

    .addCase(setFilm, (state, action) => {
      state.users.films = [...state.users.films, action.payload];
      state.isLoading = false;
    })
    .addCase(loadUserDataRequest, (state) => { // запрос
      state.isLoading = true;
      state.error = ''; // обнулили
    })
    .addCase(loadUserDataResponce, (state, action) => {
      state.data = { ...action.payload }
      state.isLoading = false;
    })
    .addCase(loadUserDataFailure, (state, action) => {
      state.error = action.payload;
    })

    .addCase(loadUserDataBaseRequest, (state) => { // запрос
      state.isLoading = true;
      state.error = ''; // обнулили
    })
    .addCase(createDocRef.fulfilled, (state, action) => {
      //console.log('payload - createDocRef', action.payload);
      state.users = { ...action.payload }
      state.isLoading = false;
    })
    .addCase(loadUserDataBaseFailure, (state, action) => {
      state.error = action.payload;
    })


    .addCase(logOutUserRequest, (state) => { // запрос
      state.isLoading = true;
      state.users = {
        settings: {
          appearance: {
            nightTheme: null,
            gallery: 'slider',
            markup: 'list',
            filter: false,
          },
        },
        films: []
      }
      state.error = ''; // обнулили
    })
    .addCase(logOutUserResponce, (state, action) => {
      state.data = { ...state, data: "" }
      state.isLoading = false;
    })
    .addCase(logOutUserFailure, (state, action) => {
      state.error = action.payload;
    })
});

export default reducer;
