import React from 'react';
import { Box } from '@mui/material';
import { Claim } from '../../../types';
import ClaimCardAdmin from '../ClaimCardAdmin';

type Props = {
  claims: Partial<Claim>[];
};

const ClaimListAdmin = ({ claims }: Props) => {
  return (
    <Box component="ul">
      {claims.map((claim) => (
        <ClaimCardAdmin claim={claim} sx={{ mt: '0.8rem' }} key={claim.id} />
      ))}
    </Box>
  );
};

export default ClaimListAdmin;
