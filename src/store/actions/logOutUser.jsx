import { createAction } from '@reduxjs/toolkit';

export const logOutUserRequest = createAction('LOGOUT_USER_REQUEST');
export const logOutUserResponce = createAction('LOGOUT_USERR_ESPONCE');
export const logOutUserFailure = createAction('LOGOUT_USER_FAILURE');
