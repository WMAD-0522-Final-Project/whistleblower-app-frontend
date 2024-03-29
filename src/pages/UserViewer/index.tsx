import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import GeneralUserView from '../GeneralUserView';
import AdminUserView from '../AdminUserView';
import TabsCustom from '../../components/MUI_comp/TabsCustom';
import { Theme, lighten, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { useAllContext } from '../../context/ClaimIdContext';
import { useNavigate } from 'react-router-dom';
import checkPermission from '../../helpers/checkPermission';
import { UserPermissionOption } from '../../types/enums';
import { selectUserData } from '../../RTK/userDataSlice';
import SectionTitle from '../../components/SectionTitle';
function UserViewer() {
  const { companyData } = useSelector(selectCompanyData);
  const [state, setState] = useState<number | null>(null);
  const { context, setContext } = useAllContext();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const navigator = useNavigate();
  const { userData } = useSelector(selectUserData);

  useEffect(() => {
    // check permission
    if (
      !checkPermission(
        UserPermissionOption.USER_MANAGEMENT,
        userData.permissions
      )
    ) {
      navigator('/');
    }
  }, []);

  useEffect(() => {
    if (state === 0) {
      setContext((context) => ({
        ...context,
        GeneralUserId: '',
      }));
    } else {
      setContext((context) => ({
        ...context,
        AdminUserIdAdmin: '',
      }));
    }
  }, [state]);

  const boxSizeOperator = () => {
    if (matches) {
      if (state === 0) {
        if (context.GeneralUserId !== '') {
          return '100%';
        } else {
          return '60%';
        }
      } else if (state === 1) {
        if (context.AdminUserIdAdmin !== '') {
          return '100%';
        } else {
          return '60%';
        }
      }
    }
  };
  return (
    <>
      <SectionTitle title="User View" />
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      >
        <TabsCustom
          options={['GeneralUsers', 'AdminUsers']}
          contents={[<GeneralUserView />, <AdminUserView />]}
          currentState={(e) => setState(e)}
          sx={{
            bgcolor: lighten(companyData.themeColors.primary, 0.28),
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: boxSizeOperator(),
            color: 'black',
          }}
        ></TabsCustom>
      </div>
    </>
  );
}

export default UserViewer;
