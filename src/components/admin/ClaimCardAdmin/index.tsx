import React, { ContextType } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { Claim, ClaimDetail } from '../../../types';
import { useSelector } from 'react-redux';
import stc from 'string-to-color';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimYellowTable from '../../SVG/ClaimYellowTable';
import { useAllContext } from '../../../context/ClaimIdContext';
import ClaimLabel from '../../SVG/ClaimLabel';
import { motion } from 'framer-motion';

type Props = {
  claim: Partial<ClaimDetail>;
  sx?: SxProps;
};

const ClaimCardAdmin = React.forwardRef(({ claim, sx }: Props, ref) => {
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const handleClaimClick = () => {
    // open detail window using a state variable
    if (claim._id) {
      if (claim._id === context.claimsId) {
        setContext((context) => ({
          ...context,
          claimsId: null,
        }));
      }
      setContext((context) => ({
        ...context,
        claimsId: claim._id,
      }));
    }
  };

  return (
    <Box
      onClick={handleClaimClick}
      ref={ref}
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
        width: '95%',
        height: '10%',
        ...sx,
      }}
    >
      <Box sx={{ width: '75%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography fontSize="0.7rem">{claim.updatedAt}</Typography>
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
                key={index}
              >
                {index <= 3 ? (
                  <ClaimLabel color={stc(label)} />
                ) : (
                  <Typography sx={{ color: '#000', lineHeight: '1' }}>
                    ...
                  </Typography>
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
          {claim.body}
        </Typography>
      </Box>
      <ClaimYellowTable claim={claim} sx={{ width: '25%' }}></ClaimYellowTable>
    </Box>
  );
});

export default motion(ClaimCardAdmin);
