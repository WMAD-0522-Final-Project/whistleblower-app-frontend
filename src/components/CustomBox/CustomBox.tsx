import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const CustomBox = ({ children }: Props) => {
  // use this theme for background color, font, etc inside component below
  const theme = useTheme();

  const styles = {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  // adjust styles for smaller screens
  const smallScreenStyles = {
    maxWidth: '350px',
  };

  // adjust styles for extra-small screens
  const extraSmallScreenStyles = {
    padding: '10px',
  };

  return (
    // need styling here
    <Box
      sx={{
        ...styles,
        '@media (max-width: 600px)': smallScreenStyles,
        '@media (max-width: 400px)': extraSmallScreenStyles,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
