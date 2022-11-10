import React, { useEffect, useState } from 'react';
import './notification.css';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch, useAppSelector } from '../../redux/commonHooks';
import ContentEditor from '../../components/ContentEditor';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, CircularProgress, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import NotificationService from '../../services/NotificationService';
import { setNotificationData } from '../../redux/notification/notificationSlice';
import { newNotification } from '../../components/common/utils';
import EventDetailForm from './EventDetailForm';
import {
  DynamicFieldResponseType,
  NotificationEventListOptionType,
  NotificationCategoryListOptionType,
} from '../../components/common/commonTypes';
import NotificationLoader from '../../components/NotificationLoader';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModal, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { notificationData, updateNotificationData } = useAppSelector(
    (state: RootState) => state.notification,
    shallowEqual,
  );

  const [eventList, setEventList] = useState<NotificationEventListOptionType[]>([]);

  const [categoryList, setCategoryList] = useState<NotificationCategoryListOptionType[]>([]);

  const [dynamicList, setDynamicList] = useState<DynamicFieldResponseType[]>([]);

  const [isUpdading, setIsUpdate] = useState<boolean>(false);

  const [categoryListFetching, setCategoryListFetching] = useState<boolean>(true);

  const [eventListFetching, setEventListFetching] = useState<boolean>(false);

  const [dynamicListFetching, setDynamicListFetching] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!updateNotificationData.notificationName) {
      setAlertMessage('Please add Notification Name');
    } else if (!updateNotificationData.notificationCategory) {
      setAlertMessage('Please add Category');
    } else if (!updateNotificationData.notificationEvent) {
      setAlertMessage('Please add Event');
    } else if (!updateNotificationData.notificationSubject) {
      setAlertMessage('Please add Subject');
    } else {
      handleOpen();
    }
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(setNotificationData(newNotification));
  };

  const getNotificationCategories = () => {
    setCategoryListFetching(true);
    NotificationService.getNotificationCategoryList()
      .then((res) => {
        // dispatch(setCategoryList(res));
        if (res.length > 0) {
          const data: NotificationCategoryListOptionType[] = res.map((item) => ({
            ...item,
            value: item.notificationCategoryId,
            label: item.notificationCategoryName,
          }));
          setCategoryList(data);
        }
      })
      .finally(() => {
        setCategoryListFetching(false);
      });
  };

  const getEventList = (notificationCategoryId: number, isUpdate?: boolean) => {
    setEventListFetching(true);
    setEventList([]);
    setDynamicList([]);
    if (isUpdate) {
      setIsUpdate(isUpdate);
    }
    NotificationService.postNotificationEventList({ notificationCategoryId })
      .then((res) => {
        if (res.length > 0) {
          const events: NotificationEventListOptionType[] = res.map((item) => ({
            ...item,
            value: item.notificationEventId,
            label: item.notificationEventName,
          }));
          setEventList(events);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setEventListFetching(false);
      });
  };

  const getDynamicFieldList = (notificationEventId: number) => {
    setDynamicListFetching(true);
    NotificationService.postDynamicFieldList({ notificationEventId })
      .then((res) => {
        setDynamicList(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setDynamicListFetching(false);
      });
  };

  useEffect(() => {
    if (notificationData.notificationId && notificationData.notificationCategoryId) {
      getEventList(notificationData.notificationCategoryId);
    }
    if (notificationData.notificationId && notificationData.notificationEventId) {
      getDynamicFieldList(notificationData.notificationEventId);
    }
  }, [notificationData]);

  useEffect(() => {
    getNotificationCategories();
  }, []);

  const {
    notificationName,
    notificationCategoryId,
    notificationEventId,
    notificationSubject,
    notificationContent,
    notificationId,
  } = notificationData;

  const renderEventDetailForm = () => {
    if (categoryListFetching || (notificationData.notificationEventId && eventListFetching && !isUpdading)) {
      return <div>{/* <CircularProgress size={40} /> */}</div>;
    }
    if (categoryList.length > 0) {
      return (
        <EventDetailForm
          notificationCategoryId={notificationCategoryId}
          notificationName={notificationName}
          notificationEventId={isUpdading ? null : notificationEventId}
          notificationSubject={notificationSubject}
          eventList={eventList}
          categoryList={categoryList}
          getEventList={(id) => getEventList(id, true)}
          getDynamicFieldList={getDynamicFieldList}
          eventListFetching={eventListFetching}
        />
      );
    }
    return null;
  };

  const renderEditor = () => {
    if (dynamicListFetching) {
      return (
        <div>
          <CircularProgress size={40} />
        </div>
      );
    }
    if (dynamicList.length > 0) {
      return (
        <ContentEditor
          notificationContent={notificationContent}
          dynamicList={dynamicList}
          notificationId={notificationId}
          updateNotificationData={updateNotificationData}
          isModal={isModal}
          handleClose={handleClose}
        />
      );
    }
    return null;
  };
  return (
    <>
      <div className="notification">
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
        <div className="notification--container">
          <h1>Learning Plan Completion Notification</h1>
          {renderEventDetailForm()}
          {renderEditor()}
          {alertMessage && (
            <Alert variant="outlined" severity="error">
              {alertMessage}
            </Alert>
          )}
          <Button type="button" onClick={handleSubmit} variant="contained" disabled={dynamicList.length <= 0}>
            Submit
          </Button>
          <NotificationLoader isLoader={categoryListFetching} />
        </div>
      </div>
    </>
  );
};

export default Notification;
