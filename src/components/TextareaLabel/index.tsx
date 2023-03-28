import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';

type type = {
  placeholder?: string;
  label?: string;
  topLabel?: string;
  sx?: SxProps;
};

const TextareaLabel = ({ placeholder, label, topLabel, sx }: type) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
        {label}
      </Typography>
      <TextField
        label={topLabel}
        variant="filled"
        placeholder={placeholder}
        multiline
        rows={4}
        InputProps={{ disableUnderline: true }}
        sx={{ width: '100%', '& .MuiInputBase-root': { paddingTop: '1rem' } }}
      />
    </Box>
  );
};
export default TextareaLabel;
