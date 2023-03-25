import React from 'react';
import { Box, Input, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextFieldCustom from '../MUI_comp/TextFieldCustom';

type type = {
  placeholder: string;
  label: string;
  topLabel: string;
};

const InputLabel = ({ placeholder, label, topLabel }: type) => {
  const theme = useTheme();
  /* const styles = {
    backgroundColor: 'gray',
    padding: '50px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto ',
  };*/

  return (
    // need styling here
    <>
      <Typography sx={{ fontSize: '1rem' }}>{label}</Typography>
      <TextFieldCustom
        label={topLabel}
        placeholder={placeholder}
        width={'300px'}
        mainColor={'#F96A02'}
        secondaryColor={'#D9D9D9'}
        textColor={'Black'}
      ></TextFieldCustom>
    </>
  );
};
export default InputLabel;
