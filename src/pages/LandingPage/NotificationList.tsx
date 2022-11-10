import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useAppSelector, useAppDispatch } from '../../redux/commonHooks';
import NotificationService from '../../services/NotificationService';
import { setNotificationData } from '../../redux/notification/notificationSlice';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { clearNotificationState, initialState } from '../../redux/notification/notificationSlice';

interface NotificationListProps {
  getNotifications: () => void;
}
const NotificationList = ({ getNotifications }: NotificationListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { notificationList } = useAppSelector((state: RootState) => state.notification, shallowEqual);

  const clearState = () => {
    dispatch(clearNotificationState(initialState));
  };

  const navigateToNewNotification = () => {
    clearState();
    navigate('/notification');
  };

  const navigateToNotification = async (id: number): Promise<any> => {
    navigateToNewNotification();
    await NotificationService.getNotificationById(id).then((res) => {
      dispatch(setNotificationData(res));
    });
  };

  const handleDeleteNotification = async (id: number): Promise<any> => {
    const request = { notificationId: id };
    await NotificationService.deleteNotification(request).then(() => getNotifications());
  };

  const activeNotificationList = notificationList.filter((item) => item.isActive);

  if (activeNotificationList.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="notification list">
          <TableHead>
            <TableRow>
              <TableCell>Notications</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeNotificationList.map((row) => (
              <TableRow key={row.notificationId}>
                <TableCell component="th" scope="row">
                  <Link component="button" onClick={() => navigateToNotification(row.notificationId)}>
                    {row.notificationName}
                  </Link>
                </TableCell>
                <TableCell>{row.notificationCategoryName}</TableCell>
                <TableCell>{row.notificationEventName}</TableCell>
                <TableCell>{row.notificationId}</TableCell>
                <TableCell>
                  <IconButton title="Delete" onClick={() => handleDeleteNotification(row.notificationId)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={3}>
      <Typography variant="h6" component="h6">
        No notification found. Please create new notification.
      </Typography>
      ;
    </Box>
  );
};

export default NotificationList;
