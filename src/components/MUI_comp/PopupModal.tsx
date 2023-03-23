import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { bgcolor } from '@mui/system';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const outerBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 250,
  bgcolor: '#FFCB14',
  boxShadow: 24,
  padding: '10px',
  borderRadius: '25px',
  borderStyle: 'none',
};

const innerBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height: 200,
  border: '5px solid white',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '15px',
};

interface Props {
  children: Function;
}
export default function PopupModal({ children }: Props) {
  // const [open, setOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    console.log('modal closed');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={outerBoxStyle}>
          <Box sx={innerBoxStyle}>{children(handleClose)}</Box>
        </Box>
      </Modal>
    </div>
  );
}
