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
import CheckboxLabel from '../../components/CheckboxLabel';
import SearchBox from '../../components/SearchBox';
import SelectBoxLabel from '../../components/SelectBoxLabel';
import { orange } from '@mui/material/colors';

type Props = {};

const Contact = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box component="main" sx={{ m: '5rem auto' }}>
      <SectionTitle title="Contact Admin Team" />
      <CustomBox sx={{ padding: '3rem 0' }}>
        <InputLabel
          label={'Email Address'}
          topLabel={'Email'}
          placeholder={'Enter your email address'}
          sx={{ maxWidth: '400px' }}
        />
        <SelectBoxLabel
          label={'What is the issue?'}
          topLabel={'Issue'}
          placeholder={'Choose your issue'}
          sx={{ mt: '1.2rem', maxWidth: '400px', width: '100%' }}
          color={companyData.themeColors.primary}
        />
        <InputLabel
          label={'Message'}
          topLabel={'Message'}
          placeholder={'Write your message'}
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
          Submit
        </ButtonComponent>
      </CustomBox>
    </Box>
  );
};

export default Contact;
