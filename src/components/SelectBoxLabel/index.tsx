import React from 'react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import SelectBoxCustom from '../MUI_comp/SelectBoxCustom';

type type = {
  placeholder: string;
  label?: string;
  name?: string;
  topLabel?: string;
  color: string;
  options: any[];
  onChange?: (event: SelectChangeEvent<string>) => void;
  sx?: SxProps;
  selectBoxSx?: SxProps;
};

const SelectBoxLabel = ({
  placeholder,
  label,
  name,
  color,
  options,
  onChange,
  sx,
  selectBoxSx,
}: type) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
        {label}
      </Typography>
      <SelectBoxCustom
        placeholder={placeholder}
        name={name}
        color={color}
        options={options}
        onChange={onChange}
        sx={{ mt: '0.3rem', ...selectBoxSx }}
      />
    </Box>
  );
};
export default SelectBoxLabel;
