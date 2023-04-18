import { Typography, Button, Box } from '@mui/material';

import FileInput from '../FileInput';
import useModal from '../../hooks/useModal';

type Props = {
  onClickYes: () => void;
};

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

const CustomAvatar = ({ onClickYes }: Props) => {
  const { handleClose, Modal } = useModal();

  return (
    <Modal outerBoxStyle={outerBoxStyle} innerBoxStyle={innerBoxStyle}>
      <FileInput name="avatar" text="Uploade Avatar Image" />
      <Button variant="contained" sx={buttonStyle} onClick={onClickYes}>
        Apply
      </Button>
      <Button variant="outlined" sx={buttonStyle} onClick={handleClose}>
        Back
      </Button>
    </Modal>
  );
};

export default CustomAvatar;
