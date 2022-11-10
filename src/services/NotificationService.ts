import HttpRequest from '../redux/utils/HttpRequest';
import {
  AddNewNotificationRequestType,
  DeleteNotificationRequestType,
  DeleteNotificationResponseType,
  DynamicFieldRequestType,
  DynamicFieldResponseType,
  NotificationCategoryListResponseType,
  NotificationEventListRequestType,
  NotificationEventListResponseType,
  NotificationListResponseType,
  NotificationResponseType,
  UpdateNotificationRequestType,
} from '../components/common/commonTypes';
import apiUrls from '../redux/utils/apiUrls';

const postDynamicFieldList = async (data: DynamicFieldRequestType) => {
  const res = await HttpRequest.post<DynamicFieldResponseType[]>(apiUrls.dynamicFieldList, data);
  return res.data;
};

const getNotificationCategoryList = async () => {
  const res = await HttpRequest.get<NotificationCategoryListResponseType[]>(apiUrls.notificationCategoryList);
  return res.data;
};

const postNotificationEventList = async (data: NotificationEventListRequestType) => {
  const res = await HttpRequest.post<NotificationEventListResponseType[]>(apiUrls.notificationEventList, data);
  return res.data;
};

const getNotificationList = async () => {
  const res = await HttpRequest.get<NotificationListResponseType[]>(apiUrls.getNotificationList);
  return res.data;
};

const addNewNotification = async (data: AddNewNotificationRequestType) => {
  const res = await HttpRequest.post<NotificationResponseType>(apiUrls.addNewNotification, data);
  return res.data;
};

const getNotificationById = async (id: number) => {
  const res = await HttpRequest.get<NotificationResponseType>(`${apiUrls.getNotificationById}/${id}`);
  return res.data;
};

const editNotificationById = async (id: number, data: AddNewNotificationRequestType) => {
  const res = await HttpRequest.post<NotificationResponseType>(`${apiUrls.editNotificationById}/${id}`, data);
  return res.data;
};

const updateNotification = async (data: UpdateNotificationRequestType) => {
  const res = await HttpRequest.put<NotificationResponseType>(apiUrls.updateNotification, data);
  return res.data;
};

const deleteNotification = async (data: DeleteNotificationRequestType) => {
  const res = await HttpRequest.delete<DeleteNotificationResponseType>(apiUrls.deleteNotification, { data });
  return res.data;
};

const NotificationService = {
  postDynamicFieldList,
  getNotificationCategoryList,
  postNotificationEventList,
  getNotificationList,
  addNewNotification,
  getNotificationById,
  editNotificationById,
  updateNotification,
  deleteNotification,
};

export default NotificationService;
