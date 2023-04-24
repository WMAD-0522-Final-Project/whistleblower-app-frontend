import { Typography, Button, Stack, Box } from '@mui/material';
import FileInput from '../FileInput';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../RTK/userDataSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import axios, { AxiosResponse } from 'axios';

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

const putAdminImg = ({
  userId,
  image,
}: {
  userId: string;
  image: string;
}): Promise<AxiosResponse> => {
  const authorizationValue = getAuthorizationValue();
  return axios({
    method: 'PUT',
    url: `${
      import.meta.env.VITE_BACKEND_URL
    }/api/user/${userId}/profileImg/update`,
    headers: { Authorization: authorizationValue },
  });
};

const CustomAvatar = ({ handleClose }: Props) => {
  const { userData } = useSelector(selectUserData);
  const [img, setImg] = useState<string>();
  const AdminImgMutation = useMutation({ mutationFn: putAdminImg });

  useEffect(() => {
    setImg(userData.profileImg);
  }, []);

  const getUploadedImg: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tempImgUrl = URL.createObjectURL(e.target.files![0]);
    setImg(tempImgUrl);
  };

  const handleApply = () => {
    AdminImgMutation.mutate({
      userId: userData._id,
      image: userData.profileImg,
    });
    handleClose;
  };

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
          onChange={getUploadedImg}
          sx={{ width: '150px' }}
          name="avatarUpload"
          text="Upload new image"
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
