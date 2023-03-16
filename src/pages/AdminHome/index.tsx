import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimList from '../../components/admin/ClaimList';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';

type Props = {};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [claims, setClaims] = useState<Partial<Claim>[]>([]);

  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  return (
    // TODO: temporary styling until Mateus's task is done
    <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
      <ClaimList claims={claims} />
    </Box>
  );
};

export default AdminHome;
