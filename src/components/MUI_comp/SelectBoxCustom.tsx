import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SxProps } from '@mui/system';
import {} from '@mui/material/colors';
import sampleClaimCategories from '../../temp/sampleClaimCategories';

interface Props {
  placeholder: string;
  color: string;
  name?: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
  sx?: SxProps;
}

const SelectBoxCustom = ({ placeholder, color, name, onChange, sx }: Props) => {
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
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {sampleClaimCategories.map((category) => (
        <MenuItem value={category.id} key={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectBoxCustom;
