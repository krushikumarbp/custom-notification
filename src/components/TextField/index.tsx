import React from 'react';
import { Grid } from '@mui/material';
import InputTextField from './InputTextField';

interface TextFieldProps {
  label: string;
  value: string;
  id: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, id, onChange, placeholder }) => {
  return (
    <>
      <Grid item xs={2} textAlign="right">
        {label}
      </Grid>
      <Grid item xs={10}>
        <InputTextField value={value} id={id} label={label} onChange={onChange} placeholder={placeholder} />
      </Grid>
    </>
  );
};

export default TextField;
