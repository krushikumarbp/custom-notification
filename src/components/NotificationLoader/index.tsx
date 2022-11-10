import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface NotificationLoaderProps {
  isLoader: boolean;
}
const NotificationLoader: React.FC<NotificationLoaderProps> = ({ isLoader }) => {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NotificationLoader;
