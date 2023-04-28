import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import { UserRoleOption } from '../../types/enums';
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

const ControlInitialRoute = (props: Props) => {
  const navigator = useNavigate();

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
    onSuccess: ({ data }) => {
      navigator(`/${data.user.role.name}`);
    },
    onError: async (error) => {
      // try to get new token
      try {
        const data = await getNewToken();
        localStorageHelper('set', 'token', data.accessToken);
        localStorageHelper('set', 'refreshToken', data.refreshToken);
        navigator(`/${UserRoleOption.ADMIN}`);
      } catch (error) {
        navigator('/login');
      }
    },
  });

  return null;
};

export default ControlInitialRoute;
