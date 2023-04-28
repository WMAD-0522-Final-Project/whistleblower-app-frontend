import { Avatar, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import { selectUserData, setUserData } from '../../../RTK/userDataSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';
import { useQuery } from '@tanstack/react-query';
import useLetterColor from '../../../hooks/useLetterColor';

type Props = {
  onClick: () => void;
  sx?: SxProps;
};

// // TODO: get company data from store
// const companyData = {
//   themeColors: {
//     primary: 'f96a02',
//     secondary: '#fff',
//   },
// };
// // TODO: get user data from store
// const userData = {
//   firstName: 'john',
//   lastName: 'doe',
//   profileImg: '/images/profileImg.jpg',
// };

const getImgPath = (): Promise<AxiosResponse> => {
  const authorizationValue = getAuthorizationValue();

  return axios({
    method: 'GET',
    url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-token`,
    headers: {
      Authorization: authorizationValue,
    },
  });
};

const AvatarIcon = ({ onClick, sx }: Props) => {
  const dispatch = useDispatch();
  const { companyData } = useSelector(selectCompanyData);
  const { userData } = useSelector(selectUserData);
  const { letterColor } = useLetterColor();

  useQuery({
    queryKey: ['getImgPath'],
    queryFn: getImgPath,
    onSuccess: ({ data }) => {
      dispatch(
        setUserData({
          _id: data.user._id,
          companyId: data.user.companyId,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          role: data.user.role,
          email: data.user.email,
          profileImg: data.user.profileImg,
          permissions: data.user.permissions,
        })
      );
    },
  });

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: companyData.themeColors.primary,
        border: `5px solid white`,
        borderRadius: '0 16px 16px 0',
        display: 'flex',
        maxWidth: '200px',
        minWidth: '150px',
        width: '50%',
        cursor: 'pointer',
        ...sx,
      }}
      onClick={onClick}
    >
      {userData.profileImg ? (
        <Box
          component="img"
          src={userData.profileImg}
          alt=""
          sx={{
            border: `2px solid ${companyData.themeColors.secondary}`,
            borderRadius: '0 50% 50% 0',
            display: 'block',
            width: '25%',
            height: '50px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Avatar
          src={userData.profileImg}
          sx={{
            backgroundColor: '#848484',
            fontSize: '1rem',
            letterSpacing: '0',
            width: '50px',
            height: '50px',
            borderRadius: '0 50% 50% 0',
            border: `2px solid ${companyData.themeColors.secondary}`,

            // width: matches ? '48px' : '30px',
            // height: matches ? '48px' : '30px',
            // position: 'absolute',
            // top: '45%',
            // left: '50%',
            // translate: '-50% -55%',
          }}
        >
          {`${userData?.firstName?.charAt(0)} ${userData?.lastName?.charAt(0)}`}
        </Avatar>
      )}

      <Typography
        sx={{ marginLeft: '4%', textTransform: 'capitalize' }}
        color={letterColor}
        fontSize="0.85rem"
      >
        {userData.firstName} {userData.lastName}
      </Typography>
    </Box>
  );
};

export default AvatarIcon;
