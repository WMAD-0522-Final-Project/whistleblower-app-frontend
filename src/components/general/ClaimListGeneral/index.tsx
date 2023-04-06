import React from 'react';
import { Box } from '@mui/material';
import CustomBox from '../../CustomBox/CustomBox';
import SectionTitle from '../../SectionTitle';
import ClaimCardGeneral from '../ClaimCardGeneral';
import sampleClaimsForGenUsers from '../../../temp/sampleClaimsForGenUsers';
import theme from '../../../theme';
import { ClaimGeneral } from '../../../types';

type Props = {
  onClaimClick: () => void;
};

const ClaimListGeneral = ({ onClaimClick }: Props) => {
  return (
    <Box
      sx={{
        mt: '3rem',
        zIndex: '1',
      }}
    >
      <SectionTitle title="YOUR PAST CLAIMS" />
      <CustomBox
        sx={{
          maxHeight: '100vw',
          overflowY: 'scroll',
          [theme.breakpoints.up('md')]: {
            maxHeight: '600px',
          },
        }}
      >
        <Box component="ul" sx={{ width: '88%' }}>
          {sampleClaimsForGenUsers.map((claim) => (
            <ClaimCardGeneral
              claim={claim as ClaimGeneral}
              sx={{ '& + &': { marginTop: '5%' } }}
              onClick={onClaimClick}
              key={claim.id}
            />
          ))}
        </Box>
      </CustomBox>
    </Box>
  );
};

export default ClaimListGeneral;
