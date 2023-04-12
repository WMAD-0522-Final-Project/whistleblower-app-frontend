import React, { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { Box, SxProps, Typography, useTheme } from '@mui/material';
import { selectCompanyData } from '../../../RTK/companySlice';
import ItemLabel from '../../ItemLabel';
import { ClaimGeneral } from '../../../types';
import { ClaimStatus } from '../../../types/enums';

type Props = {
  claim: ClaimGeneral;
  onClick: MouseEventHandler;
  sx?: SxProps;
};

const ClaimCardGeneral = ({ claim, onClick, sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();

  return (
    <Box
      component="li"
      onClick={onClick}
      sx={{
        backgroundColor: '#D9D9D9',
        borderRadius: '5px',
        padding: '3% 4% 4% 4%',
        width: '100%',
        [theme.breakpoints.up('lg')]: {
          padding: '3% 5% 4% 5%',
        },
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ItemLabel
          text={claim.status}
          bgColor={
            claim.status === ClaimStatus.InProcess
              ? companyData.themeColors.primary
              : companyData.themeColors.secondary
          }
          textColor={
            claim.status === ClaimStatus.InProcess
              ? companyData.themeColors.secondary
              : companyData.themeColors.primary
          }
          sx={{
            [theme.breakpoints.up('lg')]: {
              fontSize: '0.8rem',
            },
          }}
        />
        <Typography component="span" fontSize="0.7rem">
          Submitted on: {claim.submissionDate}
        </Typography>
      </Box>
      <Typography sx={{ mt: '4%', lineHeight: '1.2', fontSize: '0.9rem' }}>
        {claim.message}
      </Typography>
    </Box>
  );
};

export default ClaimCardGeneral;
