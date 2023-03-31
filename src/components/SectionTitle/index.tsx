import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type type = {
  title: string;
};

const SectionTitle = ({ title }: type) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '1.5rem',
        textAlign: 'center',
        color: companyData.themeColors.secondary,
        fontWeight: '500',
        mb: '0.6rem',
      }}
    >
      {title}
    </Typography>
  );
};
export default SectionTitle;
