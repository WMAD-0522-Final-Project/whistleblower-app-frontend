import React, { ElementType } from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
  [key: string]: any;
}

const CustomBox = React.forwardRef(({ children, sx, ...props }: Props, ref) => {
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
    <Box sx={{ ...styles, ...sx } as SxProps} {...props}>
      {children}
    </Box>
  );
});

export default motion(CustomBox);
