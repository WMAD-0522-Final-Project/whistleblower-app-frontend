import React, { ContextType, useEffect } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { Claim } from '../../../types';
import { useSelector } from 'react-redux';
import stc from 'string-to-color';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimYellowTable from '../../SVG/ClaimYellowTable';
import { useAllContext } from '../../../context/ClaimIdContext';
import ClaimLabel from '../../SVG/ClaimLabel';
import { motion } from 'framer-motion';
import formatDatetime from '../../../helpers/formatDatetime';

type Props = {
  // claim: Partial<Claim>;
  claim: Claim;
  sx?: SxProps;
};

const ClaimCardAdmin = React.forwardRef(({ claim, sx }: Props, ref) => {
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const handleClaimClick = () => {
    // open detail window using a state variable
    console.log('clicked!!!!!!!!!');
    if (claim._id)
      setContext((context) => ({
        ...context,
        claimsId: claim._id,
      }));
  };

  // useEffect(() => {
  //   console.log('claimId', claim._id);
  //   console.log('claim', claim);
  // }, []);

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
          <Typography fontSize="0.7rem">
            {formatDatetime(new Date(claim.createdAt))}
          </Typography>
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
          {claim.title}
        </Typography>
      </Box>
      <ClaimYellowTable claim={claim} sx={{ width: '25%' }}></ClaimYellowTable>
    </Box>
  );
});

export default motion(ClaimCardAdmin);
