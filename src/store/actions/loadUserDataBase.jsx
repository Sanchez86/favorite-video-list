import { createAction } from '@reduxjs/toolkit';

export const loadUserDataBaseRequest = createAction('load_User_Data_Base_Request');
export const loadUserDataBaseResponce = createAction('load_User_Data_Base_Responce');
export const loadUserDataBaseFailure = createAction('load_User_Data_Base_Failure');
