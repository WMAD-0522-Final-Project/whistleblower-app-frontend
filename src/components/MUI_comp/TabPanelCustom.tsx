import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps;
}
const TabPanel = ({ children, value, index, sx, ...other }: Props) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ ...sx }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
