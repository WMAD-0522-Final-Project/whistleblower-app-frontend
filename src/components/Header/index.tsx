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

type Props = {
  hasMenu?: boolean;
};

const Header = ({ hasMenu = false }: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  const muiLinkStyles = {
    padding: '5px',
    position: 'absolute',
    transition: 'scale 50ms ease-in-out',
    '&:hover': {
      scale: '1.2',
    },
  };
  const iconButtonStyles = {
    border: `4px solid ${companyData.themeColors.secondary}`,
  };

  const iconStyles = {
    color: '#fff',
    fontSize: '5vw',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.7rem',
    },
  };

  return (
    <>
      <Typography
        component="h1"
        sx={{
          color: '#fff',
          fontSize: '1.6rem',
          p: '4%',
          [theme.breakpoints.up('md')]: {
            fontSize: '2rem',
            p: '25px',
          },
        }}
      >
        {APP_NAME}
      </Typography>
      {hasMenu && (
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
            to="/admin"
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
              <HomeIcon sx={{ ...iconStyles }} />
            </IconButton>
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/admin/userView"
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
              <PersonIcon sx={{ ...iconStyles }} />
            </IconButton>
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/admin/generalUserView"
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
            to="/admin/generalUserView"
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
              <SettingsIcon sx={{ ...iconStyles }} />
            </IconButton>
          </MuiLink>
          <Box
            sx={{
              backgroundColor: companyData.themeColors.secondary,
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
      )}
    </>
  );
};

export default Header;
