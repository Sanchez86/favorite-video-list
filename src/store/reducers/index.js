import { createReducer } from '@reduxjs/toolkit';

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
} from '../actions/films';

const initialState = {
  data: {},
  isLoading: false,
  error: '',
  users: {
    settings: {
      appearance: {
        nightTheme: false,
        gallery: 'slider',
        markup: 'list'
      },
    },
    films: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilm, (state, action) => {
      state.users.films = [...state.users.films, action.payload];
    })
    .addCase(loadUserDataRequest, (state) => { // запрос
      state.isLoading = true;
      state.error = ''; // обнулили
    })
    .addCase(loadUserDataResponce, (state, action) => {
      console.log('reducer', action.payload);
      state = {...state, data: action.payload}
      state.isLoading = false;
    })
    .addCase(loadUserDataFailure, (state, action) => {
      state.error = action.payload;
    })

   .addCase(loadUserDataBaseRequest, (state) => { // запрос
      state.isLoading = true;
      state.error = ''; // обнулили
    })
    .addCase(loadUserDataBaseResponce, (state, action) => {
      state = {...state, users: action.payload}
      state.isLoading = false;
    })
    .addCase(loadUserDataBaseFailure, (state, action) => {
      state.error = action.payload;
    })


    .addCase(logOutUserRequest, (state) => { // запрос
      state.isLoading = true;
      state.error = ''; // обнулили
    })
    .addCase(logOutUserResponce, (state, action) => {
      state.data = {...state, data: ""}
      state.isLoading = false;
    })
    .addCase(logOutUserFailure, (state, action) => {
      state.error = action.payload;
    })


    // .addCase(addTodosRequest, (state) => { // запрос
    //   state.isLoading = true;
    //   state.error = ''; // обнулили
    // })
    // .addCase(addTodosResponse, (state, action) => {
    //   const stateData = deepCopy(state.data);
    //   localStorage.setItem('data', JSON.stringify([...stateData, action.payload]));

    //   state.data = [...state.data, action.payload.data];
    // })
    // .addCase(addTodosFailure, (state, action) => { // ошибка
    //   state.isLoading = false;
    //   state.error = action.payload;
    // })
    // .addCase(removeTodosRequest, (state, action) => { // запрос
    //   const elem = state.data.find((item) => item.id === action.payload);
    //   elem.isLoading = true;
    //   state.isLoading = true;
    //   state.error = ''; // обнулили
    // })
    // .addCase(removeTodosResponse, (state, action) => { // ответ
    //   const newData = state.data.filter((item) => item.id !== action.payload.id);
    //   state.data = newData;
    //   localStorage.setItem('data', JSON.stringify(newData));
    // })
    // .addCase(removeTodosFailure, (state, action) => { // ошибка
    //   state.isLoading = false;
    //   state.error = action.payload;
    // })
    // .addCase(loadTodosRequest, (state) => { // запрос
    //   state.isLoading = true;
    //   state.error = ''; // обнулили
    // })
    // .addCase(loadTodosResponse, (state, action) => { // ответ
    //   localStorage.setItem('data', JSON.stringify(action.payload));
    //   state.data = action.payload;
    //   state.isLoading = false;
    // })
    // .addCase(loadTodosFailure, (state, action) => { // ошибка
    //   state.isLoading = false;
    //   state.error = action.payload;
    // })
    // .addCase(changeItem, (state, action) => {
    //   const stateData = deepCopy(state.data);
    //   const itemIndex = stateData.findIndex((item) => item.id === action.payload);
    //   const item = stateData.find((el) => el.id === action.payload);
    //   item.completed = !item.completed;

    //   const newData = [
    //     ...stateData.slice(0, itemIndex),
    //     item,
    //     ...stateData.slice(itemIndex + 1),
    //   ];

    //   localStorage.setItem('data', JSON.stringify(newData));

    //   state.data = newData;
    // })
    // .addCase(setTemp, (state, action) => {
    //   state.temp = action.payload;
    // })
    // .addCase(updateTodosRequest, (state) => { // запрос
    //   state.isLoading = true;
    //   state.error = ''; // обнулили
    // })
    // .addCase(updateTodosResponse, (state, action) => {
    //   const stateData = deepCopy(state.data);
    //   const itemIndex = stateData.findIndex((item) => item.id === action.payload.data.id);
    //   const item = stateData.find((el) => el.id === action.payload.data.id);
    //   item.title = action.payload.data.title;
    //   const newData = [
    //     ...stateData.slice(0, itemIndex),
    //     item,
    //     ...stateData.slice(itemIndex + 1),
    //   ];

    //   localStorage.setItem('data', JSON.stringify(newData));

    //   state.data = newData;
    // })
    // .addCase(updateTodosFailure, (state, action) => { // ошибка
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
});

export default reducer;
