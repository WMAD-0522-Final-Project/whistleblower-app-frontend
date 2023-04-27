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
import useModal from '../../hooks/useModal';
import CustomAvatar from '../CustomAvatar';
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

const outerBoxStyle = {
  // width: 250,
  // height: 250,
  bgcolor: '#FFCB14',
  boxShadow: 24,
};

const innerBoxStyle = {
  // width: 200,
  // height: 200,
  border: '5px solid white',
};

const AdminLayout = (props: Props) => {
  const navigator = useNavigate();
  const { Modal, handleOpen, handleClose } = useModal();
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
    staleTime: 1000 * 10,
    retry: 0,
    onSuccess: ({ data }) => {
      if (data.user.role.name !== UserRoleOption.ADMIN) {
        navigator('/login');
      }
      setIsTokenChecked(true);
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

  return isTokenChecked ? (
    <>
      <Header hasMenu={true} />
      <AvatarIcon
        onClick={handleOpen}
        sx={{
          position: 'relative',
          zIndex: '10',
        }}
      />
      <LogoutButton
        sx={{
          mt: '1rem',
          position: 'relative',
          zIndex: '100',
        }}
      />
      <Modal outerBoxStyle={outerBoxStyle} innerBoxStyle={innerBoxStyle}>
        <CustomAvatar handleClose={handleClose} />
      </Modal>
      <Outlet />
    </>
  ) : null;
};

export default AdminLayout;
