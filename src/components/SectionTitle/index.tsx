import React from 'react';
import { useTheme, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import useLetterColor from '../../hooks/useLetterColor';
type type = {
  title: string;
};

const SectionTitle = ({ title }: type) => {
  const { companyData } = useSelector(selectCompanyData);
  const { letterColor } = useLetterColor();
  const theme = useTheme();

  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '1.2rem',
        textAlign: 'center',
        color: letterColor,
        fontWeight: '500',
        mb: '0.6rem',
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.6rem',
          mb: '1.6rem',
        },
      }}
    >
      {title}
    </Typography>
  );
};
export default SectionTitle;
