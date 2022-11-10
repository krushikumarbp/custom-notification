export const BASE_URL = 'http://backend.elitelms.com';
export const COMMONAPI_ROUTE = 'commonApi';

const apiPath = {
  dynamicFieldList: `/${COMMONAPI_ROUTE}/dynamicFieldList`,
  notificationCategoryList: `/${COMMONAPI_ROUTE}/notificationCategoryList`,
  notificationEventList: `/${COMMONAPI_ROUTE}/notificationEventList`,
  getNotificationList: `/${COMMONAPI_ROUTE}/getNotificationList`,
  addNewNotification: `/${COMMONAPI_ROUTE}/addNewNotification`,
  getNotificationById: `/${COMMONAPI_ROUTE}/getNotificationById`,
  editNotificationById: `/${COMMONAPI_ROUTE}/editNotificationById`,
  updateNotification: `/${COMMONAPI_ROUTE}/updateNotification`,
  deleteNotification: `/${COMMONAPI_ROUTE}/deleteNotification`,
};

export default apiPath;
