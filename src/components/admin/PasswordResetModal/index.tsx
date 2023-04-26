import * as React from 'react';
import { Component, useEffect, useState } from 'react';
import useModal from '../../../hooks/useModal';
import InputLabel from '../../InputLabel';
import ButtonComponent from '../../MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import TextFieldCustom from '../../MUI_comp/TextFieldCustom';
import axios, { AxiosResponse } from 'axios';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';
import { useMutation } from '@tanstack/react-query';

type Props = {
  userId: string;
};
type passwordRequestBody = {
  userId: string;
  updatedPassword: string;
};
function PasswordResetModal({ userId }: Props) {
  const { Modal } = useModal();
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const { companyData } = useSelector(selectCompanyData);
  useEffect(() => {
    console.log(password, comfirmPassword);
  }, [password]);

  const passwordSubmit = () => {
    if (password !== comfirmPassword) {
      console.log('doesnt much ');
    } else {
      passwordMutation.mutate({
        userId,
        updatedPassword: password,
      });
    }
  };

  const passwordChangeForm = async (data: passwordRequestBody) => {
    const res: AxiosResponse<string> = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/${
        data.userId
      }/password/update`,
      headers: { Authorization: getAuthorizationValue() },
      data: data.updatedPassword,
    });

    return res.data;
  };

  const passwordMutation = useMutation({
    mutationFn: passwordChangeForm,
    onSuccess: () => console.log('suceess'),
    onError: () => console.log('failed'),
  });
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '70%',
            width: '80%',
          }}
        >
          <div>Password Reset</div>
          <TextFieldCustom
            onChange={(e) => setPassword(e.target.value)}
            label={'password'}
            width={'100'}
            mainColor={companyData.themeColors.primary}
          ></TextFieldCustom>
          <TextFieldCustom
            onChange={(e) => setComfirmPassword(e.target.value)}
            label={'comfirmation'}
            width={'100'}
            mainColor={companyData.themeColors.primary}
          ></TextFieldCustom>
          <ButtonComponent
            customColor={companyData.themeColors.tertiary}
            type="submit"
            onClick={passwordSubmit}
            sx={{ color: 'black' }}
          >
            submit
          </ButtonComponent>
        </div>
      </div>
    </>
  );
}

export default PasswordResetModal;
