import {
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import FileInput from '../FileInput';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../RTK/userDataSlice';
import { useMutation } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import axios from 'axios';
import AvatarIcon from '../admin/AvatarIcon';

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
// const userData = {
//   firstName: 'john',
//   lastName: 'doe',
//   profileImg: '/images/profileImg.jpg',
// };

const putAdminImg = ({ userId, data }: { userId: string; data: FormData }) => {
  const authorizationValue = getAuthorizationValue();
  //Waiting for PUT endpoint
  return axios({
    method: 'PUT',
    url: `${
      import.meta.env.VITE_BACKEND_URL
    }/api/user/${userId}/info/profileImg/update`,
    headers: {
      Authorization: authorizationValue,
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const CustomAvatar = ({ handleClose }: Props) => {
  const { userData } = useSelector(selectUserData);
  const [imgPath, setImgPath] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);

  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    setImgPath(userData.profileImg);
  }, []);

  const getUploadedImg: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tempImgUrl = URL.createObjectURL(e.target.files![0]);
    setImgPath(tempImgUrl);
    setImgFile(e.target.files![0]);
  };

  const AdminImgMutation = useMutation({ mutationFn: putAdminImg });

  const handleApply = () => {
    const formData = new FormData();
    formData.append('userProfileImg', imgFile!);
    AdminImgMutation.mutate({ userId: userData._id, data: formData });

    // if (AdminImgMutation.isLoading) {
    //   let link = document.querySelector("link[rel~='icon']");
    //   if (!link) {
    //     link = document.createElement('link');
    //     link.rel = 'icon';
    //     document.getElementsByTagName('head')[0].appendChild(link);
    //   }
    //   link.href=
    // }
    if (!AdminImgMutation.isLoading) {
      handleClose();
    }
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
        {imgPath ? (
          <Box
            component="img"
            // src={imgPath}
            src={imgPath}
            alt=""
            sx={{
              border: `1px solid #FFF`,
              // border: `2px solid ${companyData.themeColors.secondary}`,
              borderRadius: '50%',
              display: 'block',
              width: '30%',
              maxWidth: '200px',
              maxHeight: '200px',
            }}
          />
        ) : (
          <Avatar
            src={userData.profileImg}
            sx={{
              backgroundColor: '#848484',
              fontSize: '4rem',
              letterSpacing: '0',
              width: '9rem',
              height: '9rem',
              // width: matches ? '48px' : '30px',
              // height: matches ? '48px' : '30px',
              // position: 'absolute',
              // top: '45%',
              // left: '50%',
              // translate: '-50% -55%',
            }}
          >
            {`${userData?.firstName?.charAt(0)} ${userData?.lastName?.charAt(
              0
            )}`}
          </Avatar>
        )}

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
          {/* {imgFile ? (
            <Button variant="contained" sx={buttonStyle} onClick={handleApply}>
              Apply
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              sx={buttonStyle}
              onClick={handleApply}
            >
              Apply
            </Button>
          )} */}
          <Button
            disabled={!imgFile}
            variant="contained"
            sx={buttonStyle}
            onClick={handleApply}
          >
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
