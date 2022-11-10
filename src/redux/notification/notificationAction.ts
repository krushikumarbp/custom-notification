import { PayloadAction } from '@reduxjs/toolkit';
import {
  InitialNotificationState,
  NotificationListResponseType,
  NotificationResponseType,
  SetUpdateNotificationDataType,
} from '../../components/common/commonTypes';
import { initialState } from './notificationSlice';

export const _setNotificationList = (
  state: InitialNotificationState,
  { payload }: PayloadAction<NotificationListResponseType[]>,
): void => {
  state.notificationData = initialState.notificationData;
  state.updateNotificationData = initialState.updateNotificationData;
  state.notificationList = payload;
};

export const _setNotificationData = (
  state: InitialNotificationState,
  { payload }: PayloadAction<NotificationResponseType>,
): void => {
  state.notificationData = payload;
  state.updateNotificationData = {
    ...state.updateNotificationData,
    notificationName: payload.notificationName,
    notificationCategory: payload.notificationCategoryId,
    notificationEvent: payload.notificationEventId,
    notificationSubject: payload.notificationSubject,
    notificationContent: payload.notificationContent,
  };
};

export const _setUpdateNotificationData = (
  state: InitialNotificationState,
  { payload }: PayloadAction<SetUpdateNotificationDataType>,
): void => {
  const { key, value } = payload;
  state.updateNotificationData = {
    ...state.updateNotificationData,
    [key]: value,
  };
};

export const _clearNotificationState = (
  state: InitialNotificationState,
  { payload }: PayloadAction<InitialNotificationState>,
): void => {
  state = initialState;
};
