import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';
import ClaimForm from '../../components/general/ClaimForm';

type Props = {};

const GeneralHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box
      component="main"
      sx={{
        m: '5rem auto',
        maxWidth: '450px',
      }}
    >
      <ClaimForm />
      <ClaimListGeneral />
    </Box>
  );
};

export default GeneralHome;
