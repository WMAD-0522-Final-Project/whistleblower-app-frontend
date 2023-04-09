import React from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import TextFieldCustom from '../MUI_comp/TextFieldCustom';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type type = {
  placeholder: string;
  label: string;
  topLabel: string;
  type?: string;
  name?: string;
  required?: boolean;
  sx?: SxProps;
};

const InputLabel = ({
  placeholder,
  label,
  topLabel,
  name,
  type,
  required,
  sx,
}: type) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();

  return (
    <Box sx={{ width: '88%', ...sx }}>
      <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
        {label}
      </Typography>
      <TextFieldCustom
        label={topLabel}
        placeholder={placeholder}
        width={'100%'}
        mainColor={companyData.themeColors.primary}
        type={type}
        name={name}
        required={required}
        sx={{
          mt: '0.3rem',
          backgroundColor: '#D9D9D9',
          color: companyData.themeColors.secondary,
        }}
      ></TextFieldCustom>
    </Box>
  );
};
export default InputLabel;
