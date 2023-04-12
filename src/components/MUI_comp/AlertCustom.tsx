import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, Box, SxProps } from '@mui/material';

type Props = {
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
  sx?: SxProps;
};

const AlertCustom = ({ type, text, sx }: Props) => {
  return (
    <AnimatePresence>
      <Box
        sx={{
          position: 'fixed',
          top: '4%',
          left: '50%',
          translate: '-50% 0',
          width: '90%',
          maxWidth: '500px',
          ...sx,
        }}
      >
        <motion.div
          initial={{ opacity: 0.3, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Alert severity={type} sx={{ fontSize: '0.9rem' }}>
            {text}
          </Alert>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default AlertCustom;
