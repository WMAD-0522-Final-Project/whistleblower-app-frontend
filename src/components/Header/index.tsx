import React from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { APP_NAME } from '../../data/appData';

type Props = {};

const Header = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <>
      <Typography
        component="h1"
        sx={{
          color: '#fff',
          fontSize: '1.5rem',
        }}
      >
        {APP_NAME}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          translate: '40% -40%',
        }}
      >
        <IconButton
          size="small"
          sx={{
            border: `4px solid ${companyData.themeColors.secondary}`,
            padding: '5px',
            position: 'absolute',
            left: '-30%',
            top: '42%',
          }}
        >
          <PersonIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            border: `4px solid ${companyData.themeColors.secondary}`,
            padding: '5px',
            position: 'absolute',
            left: '-20%',
            top: '73%',
          }}
        >
          <PersonIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            border: `4px solid ${companyData.themeColors.secondary}`,
            padding: '5px',
            position: 'absolute',
            left: '3%',
            top: '95%',
          }}
        >
          <PersonIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            border: `4px solid ${companyData.themeColors.secondary}`,
            padding: '5px',
            position: 'absolute',
            left: '33%',
            top: '104%',
          }}
        >
          <PersonIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
        </IconButton>
        <Box
          sx={{
            backgroundColor: companyData.themeColors.secondary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '160px',
            width: '160px',
          }}
        >
          <Box
            component="img"
            src="/images/logo.png"
            sx={{ translate: '-50% 50%', width: '44px' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;
