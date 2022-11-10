/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/commonHooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import TextField from '../../components/TextField';
import { CircularProgress } from '@mui/material';
import { setUpdateNotificationData } from '../../redux/notification/notificationSlice';
import DropdownListItem from '../../components/DropDownSelect';
import {
  EventDetailFormInitialStateType,
  EventDetailFormProps,
  NotificationCategoryListOptionType,
  NotificationEventListOptionType,
} from '../../components/common/commonTypes';

const EventDetailForm = ({
  notificationName,
  notificationCategoryId,
  notificationEventId,
  notificationSubject,
  eventList,
  categoryList,
  getEventList,
  getDynamicFieldList,
  eventListFetching,
}: EventDetailFormProps) => {
  const initialState: EventDetailFormInitialStateType = {
    notificationName,
    notificationCategory: null,
    notificationEvent: null,
    notificationSubject,
  };

  const [state, setState] = useState(initialState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notificationEventId) {
      setState({ ...state, notificationEvent: null });
    }
  }, [notificationEventId]);

  const updateState = (
    key: string,
    value: NotificationCategoryListOptionType | NotificationEventListOptionType | string,
  ) => {
    const tempState = { ...state };
    if (key === 'notificationCategory') {
      tempState.notificationEvent = null;
    }
    setState({
      ...tempState,
      [key]: value,
    });
  };

  useEffect(() => {
    if (notificationCategoryId !== state.notificationCategory?.notificationCategoryId) {
      const categoryOption = categoryList.find((item) => item.notificationCategoryId === notificationCategoryId);
      const eventOption = eventList.find((item) => item.notificationEventId === notificationEventId);
      if (categoryOption && eventOption) {
        setState({
          ...state,
          notificationCategory: categoryOption,
          notificationEvent: eventOption,
        });
      }
    }
  }, []);

  const handleNameChange = (key: string, value: string) => {
    updateState(key, value);
    dispatch(setUpdateNotificationData({ key, value }));
  };

  const handleDropdownChange = (
    stateKey: string,
    option: NotificationCategoryListOptionType | NotificationEventListOptionType | null,
  ) => {
    if (option) {
      switch (stateKey) {
        case 'notificationCategory':
          getEventList(option.value);
          dispatch(setUpdateNotificationData({ key: stateKey, value: option.value }));
          break;
        case 'notificationEvent':
          getDynamicFieldList(option.value);
          dispatch(setUpdateNotificationData({ key: stateKey, value: option.value }));
          break;
      }
      updateState(stateKey, option);
    }
  };

  const renderCategoryList = () => {
    return (
      <>
        <DropdownListItem
          options={categoryList}
          id="notificationCategory"
          placeholder="Select category"
          value={state.notificationCategory}
          onSelectChange={(value) => handleDropdownChange('notificationCategory', value)}
        />
      </>
    );
  };

  const renderLoadingPanel = () => {
    return (
      <>
        <Grid item xs={2} textAlign="right">
          Event
        </Grid>
        <Grid item xs={10}>
          <CircularProgress size={36} />
        </Grid>
      </>
    );
  };

  const renderEventList = () => {
    if (eventListFetching) {
      return renderLoadingPanel();
    }
    if (eventList.length > 0) {
      return (
        <>
          <DropdownListItem
            options={eventList}
            id="notificationEvent"
            placeholder="Select event"
            value={state.notificationEvent}
            onSelectChange={(value) => handleDropdownChange('notificationEvent', value)}
          />
        </>
      );
    }
    return null;
  };

  const renderSubjectField = () => {
    return (
      <TextField
        id="notificationSubject"
        label="Subject"
        value={state.notificationSubject}
        onChange={(value) => handleNameChange('notificationSubject', value)}
        placeholder="Enter notification subject"
      />
    );
  };
  return (
    <Box mb={2}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} rowSpacing={1} alignItems="center">
            <TextField
              id="notificationName"
              label="Name"
              value={state.notificationName}
              onChange={(value) => handleNameChange('notificationName', value)}
              placeholder="Enter notification name"
            />
            {categoryList.length > 0 && renderCategoryList()}
            {renderEventList()}
            {state.notificationCategory && renderSubjectField()}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetailForm;
