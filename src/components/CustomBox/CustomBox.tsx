import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const CustomBox = ({ children }: Props) => {
  const theme = useTheme();

  const styles = {
    backgroundColor: 'white',
    padding: '3rem 0',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    margin: '0 auto ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    // need styling here
    <Box
      sx={{
        ...styles,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
