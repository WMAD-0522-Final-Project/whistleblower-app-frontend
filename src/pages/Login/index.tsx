import React from 'react';
import { Input, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomBox from '../../components/CustomBox/CustomBox';
import InputLabel from '../../components/Input_Label/InputLabel';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';

type Props = {};

const Login = (props: Props) => {
  // use this theme for background color, font, etc inside component below
  const theme = useTheme();

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: '2rem' }}>
        Whistleblower
      </Typography>
      <Typography
        variant="h1"
        sx={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'center' }}
      >
        Login
      </Typography>
      <CustomBox>
        <InputLabel
          label={'Email Adress'}
          topLabel={'Email'}
          placeholder={'Enter your email'}
        ></InputLabel>
        <InputLabel
          label={'Password'}
          topLabel={'Password'}
          placeholder={'Enter your password'}
        ></InputLabel>
        <ButtonComponent
          width="300px"
          height="15px"
          customColor="#F96A02"
          sx={{ TextField: 'AAAAAAAAAAAAAAAA' }}
        ></ButtonComponent>
        <Typography
          variant="h1"
          sx={{ fontSize: '.8rem', display: 'flex', justifyContent: 'center' }}
        >
          Need help? Contact admin team
        </Typography>
      </CustomBox>
    </>
  );
};

export default Login;
