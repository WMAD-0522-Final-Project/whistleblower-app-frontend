import { useState, ReactNode, CSSProperties } from 'react';

import { Box, Modal as MuiModal, SxProps, useTheme } from '@mui/material';

const useModal = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const outerBoxStyleDefault = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '88%',
    height: '88%',
    bgcolor: '#fff',
    boxShadow: 24,
    padding: '10px',
    borderRadius: '25px',
    borderStyle: 'none',
    [theme.breakpoints.up('lg')]: {
      padding: '25px',
    },
  };

  const innerBoxStyleDefault = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '95%',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: '15px',
  };

  interface Modal {
    children: ReactNode;
    outerBoxStyle?: SxProps;
    innerBoxStyle?: SxProps;
  }
  const Modal = ({ children, outerBoxStyle, innerBoxStyle }: Modal) => (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...outerBoxStyleDefault, ...outerBoxStyle } as SxProps}>
        <Box sx={{ ...innerBoxStyleDefault, ...innerBoxStyle } as SxProps}>
          {children}
        </Box>
      </Box>
    </MuiModal>
  );

  return { handleOpen, handleClose, Modal };
};

export default useModal;
