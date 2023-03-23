import React from 'react';
import { Typography, Button } from '@mui/material';
import PopupModal from '../MUI_comp/PopupModal';

interface Props {
  onClickYes: () => void;
}

const buttonStyle = {
  bgcolor: '#F96A02',
  color: 'white',
  borderRadius: '25px',
  borderStyle: 'none',
  margin: '0 30px',
  boxShadow:
    '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  '&:hover': {
    borderStyle: 'none',
    bgcolor: '#eab676',
  },
};

const ConfirmationModal = ({ onClickYes }: Props) => {
  return (
    <>
      <PopupModal>
        {(handleClose: Function) => (
          <>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Are you sure?
            </Typography>
            <Button variant="contained" sx={buttonStyle} onClick={onClickYes}>
              Yes
            </Button>
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => handleClose}
            >
              No
            </Button>
          </>
        )}
      </PopupModal>
    </>
  );
};

export default ConfirmationModal;
