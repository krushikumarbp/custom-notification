import * as React from 'react';
import ReactSelect from 'react-select';
import { SingleSelectProps } from '../common/commonTypes';

const SingleSelect: React.FC<SingleSelectProps> = ({ options, id, placeholder, value, onSelectChange }) => {
  return (
    <ReactSelect
      options={options}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(value) => onSelectChange(value)}
      menuPortalTarget={document.body}
    />
  );
};

export default SingleSelect;
