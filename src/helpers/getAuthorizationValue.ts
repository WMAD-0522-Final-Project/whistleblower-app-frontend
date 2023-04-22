import localStorageHelper from './localStorageHelper';

const getAuthorizationValue = () => {
  const token = localStorageHelper('get', 'token')!;
  const refreshToken = localStorageHelper('get', 'refreshToken')!;

  return `Bearer ${token.data}`; // TODO: use until refresh token in ready from backend
  // return `Bearer ${token.data},${refreshToken.data}`;
};

export default getAuthorizationValue;
