import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { bgcolor } from '@mui/system';

const outerBoxStyle = {
  position: 'absolute' as 'absolute',
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
  border: '5px solid white',
  borderRadius: '25px',
  padding: '40px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '15px',
};

const buttonStyle = {
  bgcolor: '#F96A02',
  color: 'white',
  borderRadius: '25px',
};

export default function PopupModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={outerBoxStyle}>
          <Box sx={innerBoxStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Are you sure?
            </Typography>
            <Button variant="contained" sx={buttonStyle}>
              Yes
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
