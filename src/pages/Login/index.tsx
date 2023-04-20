import React, { FormEventHandler } from 'react';
import { Box, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import CustomBox from '../../components/CustomBox/CustomBox';
import InputLabel from '../../components/InputLabel';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Link, useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
import { AxiosCustomError } from '../../types';
import localStorageHelper from '../../helpers/localStorageHelper';
import AlertCustom from '../../components/MUI_comp/AlertCustom';
import { setUserData } from '../../RTK/userDataSlice';

type Props = {};

interface LoginResponseData {
  message: string;
  token: string;
  user: { [key: string]: any };
}

const Login = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const login = (data: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<LoginResponseData>> => {
    return axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      data,
    });
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      const {
        _id,
        companyId,
        firstName,
        lastName,
        role,
        email,
        profileImg,
        permissions,
      } = data.user;
      console.log('userData after login', data);

      dispatch(
        setUserData({
          _id,
          companyId,
          firstName,
          lastName,
          role,
          email,
          profileImg,
          permissions,
        })
      );
      localStorageHelper('set', 'token', data.token);
      navigator(`/${data.user.role}`);
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    loginMutation.mutate({
      email: formElement.email.value,
      password: formElement.password.value,
    });
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <SectionTitle title="LOGIN" />
        <CustomBox sx={{ padding: '3rem 0' }}>
          {loginMutation.error ? (
            <AlertCustom
              text={
                (loginMutation.error as AxiosCustomError).response!.data.message
              }
              type="error"
            />
          ) : (
            ''
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <InputLabel
              label={'Email Address'}
              topLabel={'Email'}
              required
              name="email"
              type="email"
              placeholder={'Enter your email address'}
              sx={{ maxWidth: '400px' }}
            />
            <InputLabel
              label={'Password'}
              topLabel={'Password'}
              required
              name="password"
              placeholder={'Enter your password'}
              sx={{ mt: '1.2rem', maxWidth: '400px' }}
            />
            <ButtonComponent
              customColor={companyData.themeColors.primary}
              type="submit"
              sx={{
                mt: '2.6rem',
                p: '0.8rem 0',
                color: companyData.themeColors.secondary,
                fontWeight: '600',
                width: '88%',
                maxWidth: '400px',
              }}
            >
              Login
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
        </CustomBox>
      </Box>
    </Box>
  );
};

export default Login;
