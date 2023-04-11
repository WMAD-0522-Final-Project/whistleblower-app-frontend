import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import CustomBox from '../../CustomBox/CustomBox';
import SearchBox from '../../SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import sampleUserDatas from '../../../temp/sampleUserDatas';
import UserCard from '../ModalWindow/UserCard';
import styles from './UserList.module.scss';
import { useClaimContext } from '../../../custom/ClaimIdContext';
import { Claim, adminUser } from '../../../types';
import RoleToggles from '../RoleToggles';
import { InputLabel } from '@mui/material';
import ItemLabel from '../../ItemLabel';
import Settings from '../../MUI_comp/Settings';
import SectionTitle from '../../SectionTitle';
import { motion } from 'framer-motion';
import TextareaLabel from '../../TextareaLabel';
import UserViewCard from '../UserViewCard';
function UserList() {
  const [text, setText] = useState('');

  const { companyData } = useSelector(selectCompanyData);
  const { claimId, setClaimId } = useClaimContext();
  const [nowUser, setNowUser] = useState<Partial<adminUser> | null>(null);
  useEffect(() => {
    if (claimId !== '') {
      const firstName = claimId?.split(' ')[0];
      const user = sampleUserDatas.filter(
        (user) => user.firstName === firstName
      )[0];
      setNowUser(user);
    }
  }, [claimId]);
  return (
    <>
      <div
        style={{
          display: 'flex',
          marginTop: '1%',
        }}
      >
        <CustomBox sx={{ height: '90%', width: '100%' }}>
          <SearchBox
            onChange={(e) => setText(e.target.value)}
            sx={{ width: 300, height: 50 }}
          ></SearchBox>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              height: '400px',
              overflow: 'scroll',
              marginTop: '6%',
            }}
            className={styles.box}
          >
            {sampleUserDatas
              .filter((user, i) => {
                if (text == '') {
                  return user;
                } else if (
                  user.firstName.toLowerCase().includes(text.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user, i) => {
                return (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '30%',
                      marginTop: `${20 * i}%`,
                      display: 'flex',
                      justifyContent: 'center',
                      top: 10,
                    }}
                  >
                    <UserViewCard
                      whileHover={{ x: 20 }}
                      user={user}
                      width={80}
                      height={100}
                      url={user.avatarUrl}
                      edit={true}
                      sx={{ marginBottom: '20px' }}
                    ></UserViewCard>
                  </div>
                );
              })}
          </div>
        </CustomBox>

        {nowUser && (
          <CustomBox
            // animate={claimId !== '' ? { display: 'inline-block' } : {}}
            sx={{
              width: '100%',
              height: '90%',
              fontSize: '1rem',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '490px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: '100%',
                  height: '90%',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    // border: 'solid 4px black',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={companyData.themeColors.secondary}
                      text="first name"
                      sx={{ fontSize: '1rem' }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    value={nowUser.firstName}
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={companyData.themeColors.secondary}
                      text="last name"
                      sx={{ fontSize: '1rem' }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    value={nowUser.lastName}
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={companyData.themeColors.secondary}
                      text="email"
                      sx={{ fontSize: '1rem' }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    value={nowUser.email}
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={companyData.themeColors.secondary}
                      text="permissions"
                      sx={{ fontSize: '1rem' }}
                    ></ItemLabel>
                  </h1>
                  <div
                    style={{
                      width: '50%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <RoleToggles
                      permmisions={nowUser.permissions?.map((e) => e.name)}
                      role={nowUser.role}
                    ></RoleToggles>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  height: '10%',
                }}
              >
                <button>submit</button>
              </div>
            </div>
          </CustomBox>
        )}
      </div>
    </>
  );
}

export default UserList;
