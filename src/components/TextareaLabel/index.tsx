import React, { ChangeEventHandler } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';

type type = {
  placeholder?: string;
  label?: string;
  topLabel?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  sx?: SxProps;
};

const TextareaLabel = ({
  placeholder,
  label,
  topLabel,
  sx,
  onChange,
  name,
}: type) => {
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
        name={name}
        InputProps={{ disableUnderline: true }}
        onChange={onChange}
        sx={{
          mt: '0.3rem',
          width: '100%',
          '& .MuiInputBase-root': { paddingTop: '1rem' },
        }}
      />
    </Box>
  );
};
export default TextareaLabel;
