import { createAction } from '@reduxjs/toolkit';

export const loadUserDataBaseRequest = createAction('LOAD_USER_DATA_BASE_REQUEST');
export const loadUserDataBaseResponce = createAction('LOAD_USER_DATA_BASE_RESPONCE');
export const loadUserDataBaseFailure = createAction('LOAD_USER_DATA_BASE_FAILURE');
