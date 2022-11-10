import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/commonHooks';
import NotificationService from '../../services/NotificationService';
import { setNotificationList } from '../../redux/notification/notificationSlice';
import { Box, Button } from '@mui/material';
import NotificationList from './NotificationList';
import NotificationLoader from '../../components/NotificationLoader';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isFetching, setIsFetching] = useState(true);

  const getNotifications = () => {
    NotificationService.getNotificationList()
      .then((res) => {
        dispatch(setNotificationList(res));
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const navigateToNewNotification = async (): Promise<any> => {
    navigate('/notification');
  };

  return (
    <Box p={6}>
      <h1>Notification List</h1>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={3}>
        <Button variant="contained" onClick={navigateToNewNotification}>
          Create Notification
        </Button>
      </Box>
      <NotificationList getNotifications={getNotifications} />
      <NotificationLoader isLoader={isFetching} />
    </Box>
  );
};

export default LandingPage;
