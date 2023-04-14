import React from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  sx?: SxProps;
};

const CustomBox = React.forwardRef(({ children, sx }: Props, ref) => {
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
<<<<<<< HEAD
    ...sx,
=======
    [theme.breakpoints.up('lg')]: {
      padding: '2.2rem 0',
    },
>>>>>>> dev
  };

  return (
    // need styling here
<<<<<<< HEAD
    <Box sx={styles}>{children}</Box>
=======
    <Box sx={{ ...styles, ...sx } as SxProps}>{children}</Box>
>>>>>>> dev
  );
});

export default motion(CustomBox);
