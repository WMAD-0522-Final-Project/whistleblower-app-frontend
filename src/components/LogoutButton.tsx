import { SxProps } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import localStorageHelper from '../helpers/localStorageHelper';
import { selectCompanyData } from '../RTK/companySlice';
import theme from '../theme';
import ButtonComponent from './MUI_comp/ButtonComponent';

type Props = {
  sx?: SxProps;
};

const LogoutButton = ({ sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const navigator = useNavigate();

  const logout = () => {
    localStorageHelper('set', 'token', '');
    localStorageHelper('set', 'refreshToken', '');
    navigator('/login');
  };

  return (
    <ButtonComponent
      customColor={companyData.themeColors.secondary}
      type="submit"
      onClick={logout}
      sx={{
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.2)',
        display: 'block',
        p: '0.2rem',
        color: companyData.themeColors.primary,
        fontSize: '0.6rem',
        fontWeight: '600',
        minWidth: '80px',
        maxWidth: '145px',
        ml: '0.8rem',
        width: '20%',
        [theme.breakpoints.up('md')]: {
          fontSize: '0.8rem',
          p: '0.3rem 1.2rem',
          width: 'auto',
        },
        ...sx,
      }}
    >
      Logout
      <LogoutIcon
        sx={{
          fontSize: '0.8rem',
          verticalAlign: 'middle',
          ml: '0.2rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
            ml: '0.3rem',
          },
        }}
      />
    </ButtonComponent>
  );
};

export default LogoutButton;
