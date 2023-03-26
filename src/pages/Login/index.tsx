import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomBox from '../../components/CustomBox/CustomBox';
import InputLabel from '../../components/InputLabel';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';

type Props = {};

const Login = (props: Props) => {
  const theme = useTheme();
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box component="main" sx={{ mt: '5rem' }}>
      <SectionTitle title="LOGIN" />
      <CustomBox>
        <InputLabel
          label={'Email Address'}
          topLabel={'Email'}
          placeholder={'Enter your email address'}
          sx={{ maxWidth: '400px' }}
        />
        <InputLabel
          label={'Password'}
          topLabel={'Password'}
          placeholder={'Enter your password'}
          sx={{ mt: '1.2rem', maxWidth: '400px' }}
        />
        <ButtonComponent
          customColor={companyData.themeColors.primary}
          sx={{
            mt: '2.6rem',
            p: '0.8rem 0',
            color: companyData.themeColors.secondary,
            fontWeight: '600',
            width: '88%',
            maxWidth: '400px',
          }}
        >
          Login
        </ButtonComponent>
        <Typography
          variant="h1"
          sx={{ fontSize: '.8rem', textAlign: 'center', mt: '1.4rem' }}
        >
          Need help?
          <Link
            to="/contact"
            style={{
              color: 'inherit',
              fontWeight: '500',
              paddingLeft: '0.4em',
            }}
          >
            Contact admin team
          </Link>
        </Typography>
      </CustomBox>
    </Box>
  );
};

export default Login;
