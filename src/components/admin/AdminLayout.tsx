import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AvatarIcon from './AvatarIcon';
import Header from '../Header';
import axios, { AxiosResponse } from 'axios';
import localStorageHelper from '../../helpers/localStorageHelper';
import { UserRoleOption } from '../../types/enums';
import useModal from '../../hooks/useModal';
import CustomAvatar from '../CustomAvatar';

type Props = {};
interface VerifyTokenResponseData {
  message: string;
  user: { [key: string]: any };
}

const AdminLayout = (props: Props) => {
  const navigator = useNavigate();
  const { Modal, handleOpen, handleClose } = useModal();

  // const verifyToken = (): Promise<AxiosResponse<VerifyTokenResponseData>> => {
  //   const token = localStorageHelper('get', 'token');
  //   if (!token?.data) navigator('/login');

  //   return axios({
  //     method: 'GET',
  //     url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-token`,
  //     headers: {
  //       Authorization: `Bearer ${token!.data}`,
  //     },
  //   });
  // };

  // useQuery({
  //   queryKey: ['token'],
  //   queryFn: verifyToken,
  //   staleTime: 1000 * 10,
  //   onSuccess: ({ data }) => {
  //     if (data.user.role !== UserRoleOption.ADMIN) {
  //       navigator('/login');
  //     }
  //   },
  //   onError: () => {
  //     navigator('/login');
  //   },
  // });

  return (
    <>
      <Header hasMenu={true} />
      <AvatarIcon onClick={handleOpen} />
      <Modal>
        <CustomAvatar handleClose={handleClose} />
      </Modal>
      <Outlet />
    </>
  );
};

export default AdminLayout;
