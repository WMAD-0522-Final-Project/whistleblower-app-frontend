import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';

type Props = {};

const GeneralHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box>
      <ClaimListGeneral />
    </Box>
  );
};

export default GeneralHome;
