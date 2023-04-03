import React from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
  sx?: SxProps;
};

const CustomBox = ({ children, sx }: Props) => {
  const theme = useTheme();

  const styles = {
    backgroundColor: 'white',
    padding: '1.2rem 0',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    margin: '0 auto ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      padding: '2.2rem 0',
    },
  };

  return (
    // need styling here
    <Box sx={{ ...styles, ...sx } as SxProps}>{children}</Box>
  );
};

export default CustomBox;
