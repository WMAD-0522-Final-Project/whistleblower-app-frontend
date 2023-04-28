import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Box, SxProps, Typography, useTheme } from '@mui/material';
import CustomBox from '../../CustomBox/CustomBox';
import SectionTitle from '../../SectionTitle';
import ClaimCardGeneral from '../ClaimCardGeneral';
import sampleClaimsForGenUsers from '../../../temp/sampleClaimsForGenUsers';
import localStorageHelper from '../../../helpers/localStorageHelper';
import { ClaimCardDataGeneral } from '../../../types';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';

type Props = {
  onClaimClick: (claimId: string) => void;
  sx?: SxProps;
};

const ClaimListGeneral = ({ onClaimClick, sx }: Props) => {
  const theme = useTheme();

  const getClaims = async (): Promise<
    AxiosResponse<{ claims: ClaimCardDataGeneral[] }>
  > => {
    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const { data: claims } = useQuery({
    queryFn: getClaims,
    queryKey: ['claims'],
  });

  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <SectionTitle title="YOUR PAST CLAIMS" />
      <CustomBox
        sx={{
          maxHeight: '100vw',
          overflowY: 'auto',
          [theme.breakpoints.up('md')]: {
            maxHeight: '600px',
          },
        }}
      >
        {claims?.data.claims.length ? (
          <Box component="ul" sx={{ width: '88%' }}>
            {claims?.data.claims.map((claim) => (
              <ClaimCardGeneral
                claim={claim}
                sx={{
                  cursor: 'pointer',
                  '& + &': {
                    marginTop: '5%',
                    [theme.breakpoints.up('lg')]: {
                      marginTop: '7%',
                    },
                  },
                }}
                onClick={() => onClaimClick(claim._id)}
                key={claim._id}
              />
            ))}
          </Box>
        ) : (
          <Typography>No claims found</Typography>
        )}
      </CustomBox>
    </Box>
  );
};

export default ClaimListGeneral;
