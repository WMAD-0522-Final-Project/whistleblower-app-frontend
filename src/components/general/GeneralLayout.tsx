import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import ButtonComponent from '../MUI_comp/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { setUserData } from '../../RTK/userDataSlice';
import localStorageHelper from '../../helpers/localStorageHelper';
import { UserRoleOption } from '../../types/enums';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';

type Props = {};

interface VerifyTokenResponseData {
  message: string;
  user: { [key: string]: any };
}

const GeneralLayout = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const navigator = useNavigate();
  const dispatch = useDispatch();

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

  useQuery({
    queryKey: ['token'],
    queryFn: verifyToken,
    staleTime: 1000 * 10 * 10,
    onSuccess: ({ data }) => {
      if (data.user.role !== UserRoleOption.GENERAL) {
        navigator('/login');
      }
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
    onError: () => {
      navigator('/login');
    },
  });

  const logout = () => {
    localStorageHelper('set', 'token', '');
    localStorageHelper('set', 'refreshToken', '');
    navigator('/login');
  };

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
      <ButtonComponent
        customColor={companyData.themeColors.secondary}
        type="submit"
        onClick={logout}
        sx={{
          boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.2)',
          display: 'block',
          mt: '1rem',
          p: '0.8rem 0',
          color: companyData.themeColors.primary,
          fontWeight: '600',
          m: '3rem auto 0',
          maxWidth: '200px',
          width: '90%',
        }}
      >
        Logout
      </ButtonComponent>
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
