import { Typography, Button, Stack, Box } from '@mui/material';

import FileInput from '../FileInput';
import useModal from '../../hooks/useModal';

type Props = {
  handleClose: () => void;
};

const buttonStyle = {
  width: '120px',
  bgcolor: '#F96A02',
  color: 'white',
  borderRadius: '25px',
  borderStyle: 'none',
  //   margin: '0 30px',
  boxShadow:
    '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  '&:hover': {
    borderStyle: 'none',
    bgcolor: '#eab676',
  },
};

const CustomAvatar = ({ handleClose }: Props) => {
  const companyData = {
    themeColors: {
      primary: 'f96a02',
      secondary: '#fff',
    },
  };
  // TODO: get user data from store
  const userData = {
    firstName: 'john',
    lastName: 'doe',
    profileImg: '/images/profileImg.jpg',
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={userData.profileImg}
          alt=""
          sx={{
            border: `2px solid ${companyData.themeColors.secondary}`,
            borderRadius: '0 50% 50% 0',
            display: 'block',
            width: '30%',
            maxWidth: '200px',
          }}
        />
        <FileInput sx={{ width: '150px' }} name="avatar" text="Upload Image" />
        <Box>
          <Typography fontSize={12} color={'red'}>
            File restrictions:
          </Typography>
          <Typography fontSize={12} color={'red'}>
            1. Format: .png or .jpg(.jpeg)
          </Typography>
          <Typography fontSize={12} color={'red'}>
            2. Maximum file size: 500 Kilobytes
          </Typography>
          <Typography fontSize={12} color={'red'}>
            3. Dimensions: 300 * 300px
          </Typography>
        </Box>
        <Stack spacing={2} marginTop={4}>
          <Button variant="contained" sx={buttonStyle} onClick={handleClose}>
            Apply
          </Button>
          <Button variant="outlined" sx={buttonStyle} onClick={handleClose}>
            Back
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CustomAvatar;
