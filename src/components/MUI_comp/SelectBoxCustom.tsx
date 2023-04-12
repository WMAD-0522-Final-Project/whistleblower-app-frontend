import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SxProps } from '@mui/system';
import {} from '@mui/material/colors';

interface Props {
  placeholder: string;
  color: string;
  options: any[];
  name?: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
  menuItemSx?: SxProps;
  sx?: SxProps;
}

const SelectBoxCustom = ({
  placeholder,
  color,
  options,
  name,
  onChange,
  menuItemSx,
  sx,
}: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <Select
      value={value}
      name={name}
      displayEmpty
      variant="filled"
      disableUnderline
      onChange={handleChange}
      sx={{
        width: '100%',
        '& svg': {
          color,
        },
        ...sx,
      }}
    >
      <MenuItem disabled value="" sx={{ ...menuItemSx }}>
        <em>{placeholder}</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem
          value={option.id ?? option._id}
          key={option.id ?? option._id}
          sx={{ ...menuItemSx }}
        >
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectBoxCustom;
