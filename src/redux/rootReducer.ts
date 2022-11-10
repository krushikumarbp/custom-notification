import { combineReducers } from '@reduxjs/toolkit';
import notificationSlice from './notification/notificationSlice';

const rootReducer = combineReducers({
  notification: notificationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
