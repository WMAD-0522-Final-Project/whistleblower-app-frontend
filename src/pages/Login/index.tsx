import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomBox from '../../components/CustomBox/CustomBox';

type Props = {};

const Login = (props: Props) => {
  // use this theme for background color, font, etc inside component below
  const theme = useTheme();

  return (
    <>
      <Typography variant="h1" fontSize="2rem">
        Login
      </Typography>
      <CustomBox>
        {/* need one custom component including label + input */}
        {/* Juan's button here */}
      </CustomBox>
    </>
  );
};

export default Login;
