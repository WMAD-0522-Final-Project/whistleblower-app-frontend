import { Typography, Button, Stack, Box } from '@mui/material';

import FileInput from '../FileInput';
import { useEffect, useState } from 'react';

type Props = {
  handleClose: () => void;
};

const buttonStyle = {
  width: '150px',
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

const CustomAvatar = ({ handleClose }: Props) => {
  const [img, setImg] = useState(userData.profileImg);

  useEffect(() => {
    // setImg();
  }, [img]);

  const handleApply = () => {};

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          component="img"
          src={img}
          alt=""
          sx={{
            border: `1px solid #FFF`,
            // border: `2px solid ${companyData.themeColors.secondary}`,
            borderRadius: '50%',
            display: 'block',
            width: '30%',
            maxWidth: '200px',
          }}
        />
        <FileInput
          sx={{ width: '150px' }}
          name="avatar"
          text="Upload new image"
          allowedFormats="image/jpg,image/jpeg,image/png"
        />
        <Box>
          <Typography fontSize={12} color={'red'}>
            File restrictions:
          </Typography>
          <Typography fontSize={12} color={'red'}>
            1. Support formats: .png or .jpg(.jpeg)
          </Typography>
          <Typography fontSize={12} color={'red'}>
            2. Maximum file size: 500KB
          </Typography>
          <Typography fontSize={12} color={'red'}>
            3. Dimensions: 300 * 300px
          </Typography>
        </Box>
        <Stack spacing={2}>
          <Button variant="contained" sx={buttonStyle} onClick={handleApply}>
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
