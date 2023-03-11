import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {};

const AvatarIcon = (props: Props) => {
  // TODO: get company data from store
  const companyData = {
    themeColors: {
      primary: 'f96a02',
      secondary: '#fff',
    },
  };
  // TODO: get user data from store
  const userData = {
    firstName: 'john',
    lastName: 'doe',
    profileImg: '/images/profileImg.jpg',
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: companyData.themeColors.primary,
        border: `5px solid ${companyData.themeColors.secondary}`,
        borderRadius: '0 16px 16px 0',
        display: 'flex',
        maxWidth: '200px',
        minWidth: '150px',
        width: '50%',
      }}
    >
      <Box
        component="img"
        src={userData.profileImg}
        alt=""
        sx={{
          border: `2px solid ${companyData.themeColors.secondary}`,
          borderRadius: '0 50% 50% 0',
          display: 'block',
          width: '50px',
        }}
      />
      <Typography
        sx={{ marginLeft: '0.8rem', textTransform: 'capitalize' }}
        color={companyData.themeColors.secondary}
      >
        {userData.firstName} {userData.lastName}
      </Typography>
    </Box>
  );
};

export default AvatarIcon;