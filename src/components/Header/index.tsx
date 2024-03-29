import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Link as MuiLink, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import theme from '../../theme';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { APP_NAME } from '../../data/appData';
import LogoutButton from '../LogoutButton';
import appLogo from '../../assets/images/app-logo.png';
import { selectUserData } from '../../RTK/userDataSlice';
import checkPermission from '../../helpers/checkPermission';
import { UserPermissionOption } from '../../types/enums';
import PasswordIcon from '@mui/icons-material/Password';
import commonStyles from '../../styles/common.module.scss';

type Props = {
  hasMenu?: boolean;
};

const Header = ({ hasMenu = false }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { userData } = useSelector(selectUserData);
  const muiLinkStyles = {
    padding: '5px',
    position: 'absolute',
    transition: 'scale 50ms ease-in-out',
    '&:hover': {
      scale: '1.2',
    },
  };
  const iconButtonStyles = {
    border: `4px solid white`,
  };

  const iconStyles = {
    color: '#fff',
    fontSize: '5vw',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.7rem',
    },
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ml: '0.8rem',
          // margin: '0 auto',
          padding: '4% 0',
          // width: '90%',
          [theme.breakpoints.up('md')]: {
            padding: '25px 0',
            justifyContent: 'flex-start',
          },
        }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            '&:hover': {
              transition: 'scale 100ms ease',
              scale: '1.03',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={appLogo}
              alt={APP_NAME}
              style={{
                width: '60px',
              }}
            />
            <Typography
              component="h1"
              sx={{
                color: '#fff',
                fontSize: '1.4rem',
                ml: '0.6rem',
                [theme.breakpoints.up('md')]: {
                  fontSize: '1.5rem',
                },
              }}
            >
              {APP_NAME}
            </Typography>
          </Box>
        </MuiLink>
        {!hasMenu && (
          <LogoutButton
            sx={{
              ml: '2rem',
            }}
          />
        )}
      </Box>
      {hasMenu && (
        <>
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              translate: '40% -40%',
            }}
          >
            <MuiLink
              component={RouterLink}
              to="/admin/userView"
              className={
                !checkPermission(
                  UserPermissionOption.USER_MANAGEMENT,
                  userData.permissions
                ) && commonStyles.disabled
              }
              sx={{
                ...muiLinkStyles,
                right: '110%',
                top: '37%',
              }}
            >
              <IconButton
                size="small"
                sx={{
                  ...iconButtonStyles,
                }}
              >
                <PersonIcon sx={{ ...iconStyles }} />
              </IconButton>
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/admin/settings"
              className={
                !checkPermission(
                  UserPermissionOption.SYSTEM_MANAGEMENT,
                  userData.permissions
                ) && commonStyles.disabled
              }
              sx={{
                ...muiLinkStyles,
                right: '98%',
                top: '71%',
              }}
            >
              <IconButton
                size="small"
                sx={{
                  ...iconButtonStyles,
                }}
              >
                <SettingsIcon sx={{ ...iconStyles }} />
              </IconButton>
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/admin/user-inquiries"
              sx={{
                ...muiLinkStyles,
                right: '72%',
                top: '97%',
              }}
            >
              <IconButton
                size="small"
                sx={{
                  ...iconButtonStyles,
                }}
              >
                <InventoryIcon sx={{ ...iconStyles }} />
              </IconButton>
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/admin/logs"
              sx={{
                ...muiLinkStyles,
                right: '37%',
                top: '108%',
              }}
            >
              <IconButton
                size="small"
                sx={{
                  ...iconButtonStyles,
                }}
              >
                <MenuBookIcon sx={{ ...iconStyles }} />
              </IconButton>
            </MuiLink>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30vw',
                width: '30vw',
                [theme.breakpoints.up('md')]: {
                  height: '162px',
                  width: '162px',
                },
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                sx={{ translate: '-55% 55%', width: '26%' }}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Header;
