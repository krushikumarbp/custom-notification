// export application level slices
import { createSlice } from '@reduxjs/toolkit';
import {
  InitialNotificationState,
  NotificationListResponseType,
  NotificationResponseType,
  AddNewNotificationRequestType,
} from '../../components/common/commonTypes';
import { newNotification, updateNotification } from '../../components/common/utils';
import {
  _setNotificationList,
  _setNotificationData,
  _setUpdateNotificationData,
  _clearNotificationState,
} from './notificationAction';

export const initialState: InitialNotificationState = {
  notificationList: [] as NotificationListResponseType[],
  notificationData: newNotification as NotificationResponseType,
  updateNotificationData: updateNotification as AddNewNotificationRequestType,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationList: _setNotificationList,
    setNotificationData: _setNotificationData,
    setUpdateNotificationData: _setUpdateNotificationData,
    clearNotificationState: _clearNotificationState,
  },
});

export const { setNotificationList, setNotificationData, setUpdateNotificationData, clearNotificationState } =
  notificationSlice.actions;

export default notificationSlice.reducer;
