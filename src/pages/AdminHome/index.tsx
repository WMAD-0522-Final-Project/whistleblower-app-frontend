import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimList from '../../components/admin/ClaimList';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';
import SearchBox from '../../components/SearchBox';

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
    <Box sx={{ height: '100vh' }}>
      <SearchBox
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: '76%', minWidth: '200px' }}
      />
      <ClaimList claims={filteredClaims()} />
    </Box>
  );
};

export default AdminHome;
