import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

interface InputTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  textFieldProps?: TextFieldProps;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  id,
  label,
  value = '',
  onChange,
  textFieldProps,
  placeholder,
}) => {
  const [inputValue, setValue] = useState<string>(value);

  useEffect(() => {
    // this will perform the prefilled input value
    if (value) {
      updateValueToState(value);
    }
  }, [value]);

  const hanldeInputValueUpdate = (event: ChangeEvent<HTMLInputElement>): void => {
    const val = event.target.value;
    updateValueToState(val);
  };

  const updateValueToState = (val: string) => {
    // this will update the input value on this component state
    setValue(val);
    onChange(val);
  };

  return (
    <TextField
      value={inputValue}
      id={id}
      aria-label={label}
      onChange={hanldeInputValueUpdate}
      hiddenLabel
      fullWidth
      placeholder={placeholder}
      size="small"
      {...textFieldProps}
    />
  );
};

export default InputTextField;
