import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { SxProps } from '@mui/system';
import {} from '@mui/material/colors';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'label'> {
  label: string;
  width: string;
  height?: string;
  mainColor: string;
  secondaryColor?: string;
  textColor?: string;
}

const TextFieldCustom = ({
  label,
  width,
  height,
  mainColor,
  secondaryColor,
  textColor,
  ...props
}: CustomTextFieldProps) => {
  const textFieldStyle = {
    width: `${width}`,

    '& .MuiFilledInput-underline:after': {
      borderBottomColor: `${mainColor}`, // customize the underline color when the input field is filled
    },
    '&:focus-within .MuiFilledInput-underline:after': {
      borderBottomColor: `${mainColor}`, // customize the underline color when the input field is focused
    },

    '& label.Mui-focused': {
      color: `${mainColor}`,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
    },
  };
  return (
    <TextField
      margin="dense"
      label={label}
      id="mui-theme-provider-standard-input"
      sx={{ ...textFieldStyle }}
      variant="filled"
      {...props}
    />
  );
};

export default TextFieldCustom;
