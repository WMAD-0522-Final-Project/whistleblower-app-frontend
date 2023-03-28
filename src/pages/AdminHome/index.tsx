import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimList from '../../components/admin/ClaimList';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';

import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';

type Props = {};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [query, setQuery] = useState('');
  const [claims, setClaims] = useState<Partial<Claim>[]>([]);

  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  const filteredClaims = () =>
    claims.filter((claim) =>
      claim.message?.toLowerCase().includes(query.toLowerCase())
    );

  return (
    // TODO: temporary styling until Mateus's task is done

    <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
      {/* TODO: temporary claim data */}
      <ClaimChat chatData={sampleClaimDetail.chats} />
    </Box>
  );
};

export default AdminHome;
