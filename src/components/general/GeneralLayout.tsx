import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../RTK/userDataSlice';
import { UserRoleOption } from '../../types/enums';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import localStorageHelper from '../../helpers/localStorageHelper';

type Props = {};

interface VerifyTokenResponseData {
  message: string;
  user: { [key: string]: any };
}
interface RefreshTokenResponseData {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const GeneralLayout = (props: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  // const [isTokenChecked, setIsTokenChecked] = useState(false);

  const verifyToken = (): Promise<AxiosResponse<VerifyTokenResponseData>> => {
    const authorizationValue = getAuthorizationValue();
    if (!authorizationValue) navigator('/login');

    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-token`,
      headers: {
        Authorization: authorizationValue,
      },
    });
  };

  const getNewToken = async (): Promise<RefreshTokenResponseData> => {
    const authorizationValue = getAuthorizationValue(true);
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
      headers: {
        Authorization: authorizationValue,
      },
    });
    return res.data;
  };

  useQuery({
    queryKey: ['token'],
    queryFn: verifyToken,
    staleTime: 1000 * 60 * 10,
    retry: 0,
    onSuccess: ({ data }) => {
      if (data.user.role.name !== UserRoleOption.GENERAL) {
        navigator('/login');
      }
      // setIsTokenChecked(true);
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
    onError: async (error) => {
      // try to get new token
      try {
        const data = await getNewToken();
        localStorageHelper('set', 'token', data.accessToken);
        localStorageHelper('set', 'refreshToken', data.refreshToken);
      } catch (error) {
        navigator('/login');
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        pb: '1rem',
      }}
    >
      <Header hasMenu={false} />
      <Outlet />
      <Typography
        variant="h1"
        sx={{ fontSize: '.8rem', textAlign: 'center', mt: '1.4rem' }}
      >
        Need help?
        <Link
          to="/contact"
          style={{
            color: 'inherit',
            fontWeight: '500',
            paddingLeft: '0.4em',
          }}
        >
          Contact admin team
        </Link>
      </Typography>
    </Box>
  );
};

export default GeneralLayout;
