import React, { FormEventHandler, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AlertColor, Box, Typography } from '@mui/material';
import CustomBox from '../../components/CustomBox/CustomBox';
import InputLabel from '../../components/InputLabel';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import SectionTitle from '../../components/SectionTitle';
import SelectBoxLabel from '../../components/SelectBoxLabel';
import { useMutation } from '@tanstack/react-query';
import { AxiosCustomError } from '../../types';
import AlertCustom from '../../components/MUI_comp/AlertCustom';
import { Link } from 'react-router-dom';
import contactCategories from '../../data/contactCategories';

type Props = {};

interface ContactFormReqBody {
  email: string;
  inquiryType: string;
  message: string;
}
interface ContactFormRes {
  [key: string]: any;
}

const Contact = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [alert, setAlert] = useState({
    type: '' as AlertColor,
    message: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const values = (e.target as HTMLFormElement).email.value;
    const data = {
      email: (e.target as HTMLFormElement).email.value,
      inquiryType: (e.target as HTMLFormElement).inquiryType.value,
      message: (e.target as HTMLFormElement).message.value,
    };
    contactFormMutation.mutate(data);
  };

  const sendContactForm = async (data: ContactFormReqBody) => {
    const res: AxiosResponse<ContactFormRes> = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/contact`, // TODO: need correct endpoint
      data,
    });
    console.log('res', res.data);

    return res.data;
  };

  const contactFormMutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      console.log('success');
      setAlert({
        type: 'success',
        message:
          'Successfully submitted. Admin team will get back to you shortly.',
      });
    },
    onError: (data: AxiosCustomError) => {
      setAlert({
        type: 'error',
        message: data.response!.data.message,
      });
      console.log('Error:', data.response!.data.message);
    },
  });

  return (
    <Box component="main" sx={{ m: '5rem auto' }}>
      {alert.message && <AlertCustom text={alert.message} type={alert.type} />}
      <SectionTitle title="Contact Admin Team" />
      <CustomBox
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: '3rem 0',
          width: '100%',
        }}
      >
        <InputLabel
          label={'Email Address'}
          topLabel={'Email'}
          placeholder={'Enter your email address'}
          name="email"
          type="email"
          required
          sx={{ maxWidth: '400px' }}
        />
        <SelectBoxLabel
          label={'What is the issue?'}
          topLabel={'Issue'}
          placeholder={'Choose your issue'}
          options={contactCategories}
          name="inquiryType"
          sx={{ mt: '1.2rem', maxWidth: '400px', width: '100%' }}
          color={companyData.themeColors.primary}
        />
        <InputLabel
          label={'Message'}
          topLabel={'Message'}
          placeholder={'Write your message'}
          name="message"
          required
          sx={{ mt: '1.2rem', maxWidth: '400px' }}
        />
        <ButtonComponent
          customColor={companyData.themeColors.primary}
          type="submit"
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
        <Typography
          variant="h1"
          sx={{ fontSize: '.8rem', textAlign: 'center', mt: '1.4rem' }}
        >
          <Link
            to="/login"
            style={{
              color: 'inherit',
              fontWeight: '500',
              paddingLeft: '0.4em',
            }}
          >
            Go back to login page
          </Link>
        </Typography>
      </CustomBox>
    </Box>
  );
};

export default Contact;
