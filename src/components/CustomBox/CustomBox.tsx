import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const CustomBox = ({ children }: Props) => {
  // use this theme for background color, font, etc inside component below
  const theme = useTheme();

  return (
    // need styling here
    <Box>{children}</Box>
  );
};

export default CustomBox;
