import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface NotificationModalProps {
  isModal: boolean;
  handleClose: () => void;
  sendNotification: () => void;
  notificationSubject: string;
  notificationMessage: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isModal,
  handleClose,
  sendNotification,
  notificationSubject,
  notificationMessage,
}) => {
  return (
    <div>
      <Dialog
        open={isModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="notifcation-modal"
      >
        <DialogTitle>{notificationSubject}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="notifcation-modal"
            dangerouslySetInnerHTML={{ __html: notificationMessage }}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendNotification}>Send Notification</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationModal;
