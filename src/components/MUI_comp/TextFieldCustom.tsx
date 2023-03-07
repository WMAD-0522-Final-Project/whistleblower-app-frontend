import React from 'react';
import { TextField, TextFieldProps } from '@mui/material'
import { SxProps } from '@mui/system';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'label'> {
    label: string;
    width: string;
    mainColor: string;
    secondaryColor: string;
    textColor: string;
  }

const TextFieldCustom: React.FC<CustomTextFieldProps> = ({
    label,
    width,
    mainColor,
    secondaryColor,
    textColor,
  ...props
}) => {
    
const textFieldStyle = {
    width: `${width}`,
    "& label.Mui-focused": {
        color: `${mainColor}`
      },
    "& .MuiOutlinedInput-root": {
      color: `${textColor}`,
          backgroundColor: `${secondaryColor}`,
          "& fieldset": {
            borderColor: `${mainColor}`,        
          },
          '&:hover fieldset': {
            borderColor: `${mainColor}`,
          },
        },
        "& .MuiOutlinedInput-root.Mui-focused":{
          color: `${textColor}`,
          backgroundColor: `${secondaryColor}`,
          "& fieldset": {
            borderColor: `${mainColor}`
          }
        },
      };
  return (
    <TextField
    label={label}
    id="mui-theme-provider-standard-input"
      sx={{ ...textFieldStyle }}
      variant="outlined"
      {...props}
    />
  );
};

export default TextFieldCustom;