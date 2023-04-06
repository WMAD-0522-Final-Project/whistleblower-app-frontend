import React, { useContext } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { Claim } from '../../../types';
import { useSelector } from 'react-redux';
import stc from 'string-to-color';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimYellowTable from '../../SVG/ClaimYellowTable';
import {
  ClaimIdContext,
  useClaimContext,
} from '../../../custom/ClaimIdContext';
import ClaimLabel from '../../SVG/ClaimLabel';

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography fontSize="0.7rem">{claim.submissionDate}</Typography>
          <Box
            sx={{
              background: companyData.themeColors.secondary,
              boxShadow: '1px 1px 2px 1px inset rgba(0,0,0,0.3)',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '23px',
              padding: '0.2rem',
              overflowX: 'hidden',
              ml: '5%',
              width: '120px',
            }}
          >
            {claim.labels?.slice(0, 5).map((label, index) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': {
                    width: '24px',
                  },
                }}
              >
                {index <= 3 ? (
                  <ClaimLabel color={stc(label)} />
                ) : (
                  <Typography sx={{ color: '#000' }}>...</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
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
