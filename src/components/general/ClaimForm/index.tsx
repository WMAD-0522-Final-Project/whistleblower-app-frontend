import React, { FormEventHandler, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AlertColor, Box, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import CustomBox from '../../CustomBox/CustomBox';
import SectionTitle from '../../SectionTitle';
import TextareaLabel from '../../TextareaLabel';
import { selectCompanyData } from '../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import SelectBoxLabel from '../../SelectBoxLabel';
import FileInput from '../../FileInput';
import CheckboxLabel from '../../CheckboxLabel';
import ButtonComponent from '../../MUI_comp/ButtonComponent';
import InputLabel from '../../InputLabel';
import localStorageHelper from '../../../helpers/localStorageHelper';
import AlertCustom from '../../MUI_comp/AlertCustom';
import sampleClaimCategories from '../../../temp/sampleClaimCategories';
import { AxiosCustomError } from '../../../types';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';

type Props = {};

interface NewClaimRequestBody {
  claimTitle: string;
  category: string;
  body: string;
  // file: File;
  isAnonymous: boolean;
}
interface NewClaimResponseData {
  message: string;
  claim: { [key: string]: any };
}

const ClaimForm = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();
  const [alert, setAlert] = useState({
    type: '' as AlertColor,
    message: '',
  });

  const createNewClaim = ({
    claimTitle,
    category,
    body,
    // file,
    isAnonymous,
  }: NewClaimRequestBody): Promise<AxiosResponse<NewClaimResponseData>> => {
    console.log('request body:', {
      title: claimTitle,
      category,
      body,
      isAnonymous,
    });

    return axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/create`,
      data: {
        title: claimTitle,
        category,
        body,
        isAnonymous,
      },
      params: {
        isAnonymous,
      },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const newClaimMutation = useMutation({
    mutationFn: createNewClaim,
    onSuccess: (data) => {
      setAlert({
        type: 'success',
        message:
          'Claim successfully submitted! Admin team will respond shortly.',
      });
    },
    onError: () => {
      setAlert({
        type: 'error',
        message: (newClaimMutation.error as AxiosCustomError).response!.data
          .message,
      });
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const {
      claimTitle,
      category,
      body,
      // file,
      isAnonymous,
    } = e.target as HTMLFormElement;
    if (!claimTitle.value || !category.value || !body.value) {
      setAlert({
        type: 'error',
        message: '"Title", "Category" and "Message" fields are required.',
      });
      return;
    }
    newClaimMutation.mutate({
      claimTitle: claimTitle.value,
      category: category.value,
      body: body.value,
      // file,
      isAnonymous: isAnonymous.checked,
    });
    // console.log('claimTitle', claimTitle.value);
    // console.log('category', category.value);
    // console.log('body', body.value);
    // console.log('file', file.files[0]);
    // console.log('isAnonymous', isAnonymous.checked);
  };

  return (
    <Box>
      {alert.message && <AlertCustom text={alert.message} type={alert.type} />}
      <SectionTitle title="MAKE CLAIM" />
      <CustomBox>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '88%',
            flexDirection: 'column',
          }}
        >
          <InputLabel
            label="Title"
            topLabel={'Title'}
            required
            name="claimTitle"
            placeholder={'Enter title'}
            sx={{
              width: '100%',
            }}
          />
          <SelectBoxLabel
            placeholder="Choose category"
            label="Category"
            name="category"
            options={sampleClaimCategories}
            color={companyData.themeColors.primary}
            selectBoxSx={{
              '& .MuiSelect-select': {
                padding: '1rem',
              },
            }}
            sx={{ mt: '1rem', width: '100%' }}
          />
          <TextareaLabel
            placeholder="Enter message"
            label="Message"
            topLabel=""
            name="body"
            sx={{
              mt: '1rem',
              width: '100%',
            }}
          />
          <FileInput
            name="file"
            sx={{
              mt: '1rem',
              [theme.breakpoints.up('lg')]: {
                fontSize: '0.8rem',
              },
            }}
          />
          <CheckboxLabel
            label="send anonymously"
            name="isAnonymous"
            boxColor={companyData.themeColors.primary}
            boxSize="1.4rem"
            labelFontSize="0.8rem"
            boxStyle={{ padding: '0.2rem' }}
            sx={{ mt: '1rem' }}
          />
          <ButtonComponent
            customColor={companyData.themeColors.primary}
            type="submit"
            sx={{
              mt: '1.4rem',
              p: '0.8rem 0',
              color: companyData.themeColors.secondary,
              fontWeight: '600',
              maxWidth: '300px',
              width: '100%',
            }}
          >
            Submit
          </ButtonComponent>
        </Box>
      </CustomBox>
    </Box>
  );
};

export default ClaimForm;
