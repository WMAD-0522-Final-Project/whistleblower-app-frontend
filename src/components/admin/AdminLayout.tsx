import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import AvatarIcon from './AvatarIcon';
import Header from '../Header';
import { setUserData } from '../../RTK/userDataSlice';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import { UserRoleOption } from '../../types/enums';
import LogoutButton from '../LogoutButton';

type Props = {};
interface VerifyTokenResponseData {
  message: string;
  user: { [key: string]: any };
}

const AdminLayout = (props: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [isTokenChecked, setIsTokenChecked] = useState(false);

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
    staleTime: 1000 * 10,
    retry: 0,
    onSuccess: ({ data }) => {
      if (data.user.role !== UserRoleOption.ADMIN) {
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
      setIsTokenChecked(true);
    },
    onError: () => {
      navigator('/login');
    },
  });

  return (
    isTokenChecked && (
      <>
        <Header hasMenu={true} />
        <AvatarIcon />
        <LogoutButton
          sx={{
            mt: '1rem',
            position: 'relative',
            zIndex: '100',
          }}
        />
        <Outlet />
      </>
    )
  );
};

export default AdminLayout;
