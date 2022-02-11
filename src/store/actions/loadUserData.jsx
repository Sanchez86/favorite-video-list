import { createAction } from '@reduxjs/toolkit';

export const loadUserDataRequest = createAction('LOAD_USER_DATA_REQUEST');
export const loadUserDataResponce = createAction('LOAD_USER_DATA_RESPONSE');
export const loadUserDataFailure = createAction('LOAD_USER_DATA_FAILURE');
