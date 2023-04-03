import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

type Props = {};

const GeneralLayout = (props: Props) => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Header hasMenu={false} />
      <Outlet />
    </Box>
  );
};

export default GeneralLayout;
