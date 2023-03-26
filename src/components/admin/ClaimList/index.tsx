import React from 'react';
import { Box } from '@mui/material';
import { Claim } from '../../../types';
import ClaimListItem from '../ClaimListItem';

type Props = {
  claims: Partial<Claim>[];
};

const ClaimList = ({ claims }: Props) => {
  return (
    <Box component="ul">
      {claims.map((claim) => (
        <ClaimListItem claim={claim} sx={{ mt: '0.8rem' }} />
      ))}
    </Box>
  );
};

export default ClaimList;
