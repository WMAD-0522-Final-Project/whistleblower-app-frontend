import React from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import SelectBoxCustom from '../MUI_comp/SelectBoxCustom';

type type = {
  placeholder: string;
  label?: string;
  topLabel?: string;
  color: string;
  sx?: SxProps;
  selectBoxSx?: SxProps;
};

const SelectBoxLabel = ({
  placeholder,
  label,
  color,
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
        label="Message"
        color={color}
        sx={{ ...selectBoxSx }}
      />
    </Box>
  );
};
export default SelectBoxLabel;
