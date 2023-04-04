import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';
import ButtonComponent from '../MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type Props = {};

const GeneralLayout = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  const logout = () => {
    // logout
  };

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        pb: '1rem',
      }}
    >
      <Header hasMenu={false} />
      <Outlet />
      <ButtonComponent
        customColor={companyData.themeColors.secondary}
        type="submit"
        onClick={logout}
        sx={{
          boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.2)',
          display: 'block',
          mt: '1rem',
          p: '0.8rem 0',
          color: companyData.themeColors.primary,
          fontWeight: '600',
          m: '3rem auto 0',
          maxWidth: '200px',
          width: '90%',
        }}
      >
        Logout
      </ButtonComponent>
      <Typography
        variant="h1"
        sx={{ fontSize: '.8rem', textAlign: 'center', mt: '1.4rem' }}
      >
        Need help?
        <Link
          to="/contact"
          style={{
            color: 'inherit',
            fontWeight: '500',
            paddingLeft: '0.4em',
          }}
        >
          Contact admin team
        </Link>
      </Typography>
    </Box>
  );
};

export default GeneralLayout;
