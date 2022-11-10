import React from 'react';
import { Grid } from '@mui/material';
import SingleSelect from './SingleSelect';
import { DropdownListItemProps } from '../common/commonTypes';

const DropdownListItem: React.FC<DropdownListItemProps> = ({ options, id, placeholder, value, onSelectChange }) => {
  return (
    <>
      <Grid item xs={2} textAlign="right">
        Category
      </Grid>
      <Grid item xs={10}>
        <SingleSelect
          id={id}
          value={value}
          options={options}
          placeholder={placeholder}
          onSelectChange={onSelectChange}
        />
      </Grid>
    </>
  );
};

export default DropdownListItem;
