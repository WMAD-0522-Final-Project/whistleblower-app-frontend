import React, { useContext } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { Claim } from '../../../types';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimYellowTable from '../../SVG/ClaimYellowTable';
import {
  ClaimIdContext,
  useClaimContext,
} from '../../../custom/ClaimIdContext';

type Props = {
  claim: Partial<Claim>;
  sx?: SxProps;
};

const ClaimCardAdmin = ({ claim, sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { claimId, setClaimId } = useClaimContext();
  const handleClaimClick = () => {
    // open detail window using a state variable
    console.log(claim.id);
    if (claim.id) setClaimId(claim.id);
  };

  return (
    <Box
      component="li"
      onClick={() => handleClaimClick()}
      sx={{
        backgroundColor: companyData.themeColors.primary,
        borderRadius: '2rem',
        boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
        color: companyData.themeColors.secondary,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '66px',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
        position: 'relative',
        width: '90%',
        height: '10%',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <Typography fontSize="0.7rem">{claim.submissionDate}</Typography>
        <Typography
          fontSize="0.9rem"
          sx={{
            width: '90%',
            overflow: 'hidden',
            p: '0.2rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {claim.message}
        </Typography>
      </Box>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '130%',
          right: '-30%',
          top: '5%',
        }}
      >
        <ClaimYellowTable claim={claim}></ClaimYellowTable>
      </div>
    </Box>
  );
};

export default ClaimCardAdmin;
