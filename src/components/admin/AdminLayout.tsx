import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import AvatarIcon from './AvatarIcon';
import Header from '../Header';
import { setUserData } from '../../RTK/userDataSlice';
import localStorageHelper from '../../helpers/localStorageHelper';
import { UserRoleOption } from '../../types/enums';

type Props = {};
interface VerifyTokenResponseData {
  message: string;
  user: { [key: string]: any };
}

const AdminLayout = (props: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const verifyToken = (): Promise<AxiosResponse<VerifyTokenResponseData>> => {
    const token = localStorageHelper('get', 'token');
    if (!token?.data) navigator('/login');

    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-token`,
      headers: {
        Authorization: `Bearer ${token!.data}`,
      },
    });
  };

  useQuery({
    queryKey: ['token'],
    queryFn: verifyToken,
    staleTime: 1000 * 10,
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
    },
    onError: () => {
      navigator('/login');
    },
  });

  return (
    <>
      <Header hasMenu={true} />
      <AvatarIcon />
      <Outlet />
    </>
  );
};

export default AdminLayout;
