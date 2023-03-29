import React from 'react';
import { Typography, Button } from '@mui/material';
import useModal from '../MUI_comp/useModal';

interface Props {
  onClickYes: () => void;
}

const outerBoxStyle = {
  width: 250,
  height: 250,
  bgcolor: '#FFCB14',
  boxShadow: 24,
};

const innerBoxStyle = {
  width: 200,
  height: 200,
  border: '5px solid white',
};

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
  const { handleClose, Modal } = useModal();

  return (
    <Modal outerBoxStyle={outerBoxStyle} innerBoxStyle={innerBoxStyle}>
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
        <Button variant="outlined" sx={buttonStyle} onClick={handleClose}>
          No
        </Button>
      </>
    </Modal>
  );
};

export default ConfirmationModal;
