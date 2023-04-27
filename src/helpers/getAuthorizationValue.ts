import localStorageHelper from './localStorageHelper';

const getAuthorizationValue = (refreshOnly = false) => {
  const refreshToken = localStorageHelper('get', 'refreshToken')!;

  if (refreshOnly) return `Bearer ${refreshToken.data}`;
  const token = localStorageHelper('get', 'token')!;

  return `Bearer ${token.data} ${refreshToken.data}`;
};

export default getAuthorizationValue;
