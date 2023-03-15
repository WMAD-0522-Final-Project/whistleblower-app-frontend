import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { bgcolor } from '@mui/system';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 250,
  bgcolor: '#FFCB14',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '15px',
  borderRadius: '25px',
  borderStyle: 'none',
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
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Are you sure?
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#F96A02', color: 'white', borderRadius: '25px' }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            sx={{ bgcolor: '#F96A02', color: 'white', borderRadius: '25px' }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
