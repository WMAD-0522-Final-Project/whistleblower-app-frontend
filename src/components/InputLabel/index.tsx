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
  value?: string;
  required?: boolean;
  sx?: SxProps;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const InputLabel = ({
  placeholder,
  label,
  topLabel,
  name,
  type,
  value,
  required,
  sx,
  onChange,
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
        value={value}
        required={required}
        sx={{
          mt: '0.3rem',
          color: companyData.themeColors.secondary,
        }}
      ></TextFieldCustom>
    </Box>
  );
};
export default InputLabel;
