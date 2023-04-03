import * as React from 'react';
import { Component, useState } from 'react';
import CustomBox from '../../CustomBox/CustomBox';
import SearchBox from '../../SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import sampleUserDatas from '../../../temp/sampleUserDatas';
import UserCard from '../ModalWindow/UserCard';
import styles from './UserList.module.scss';

function UserList() {
  const [text, setText] = useState('');

  const { companyData } = useSelector(selectCompanyData);

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
              // backgroundColor: 'red',
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
                      alignItems: 'center',
                    }}
                  >
                    <UserCard
                      name={`${user.firstName} ${user.lastName}`}
                      width={70}
                      height={50}
                      url={user.avatarUrl}
                      edit={true}
                      sx={{ marginBottom: '20px' }}
                    ></UserCard>
                  </div>
                );
              })}
          </div>
        </CustomBox>
        <CustomBox sx={{ width: '100%', height: '90%' }}>
          <div style={{ width: '100%', height: '490px' }}></div>
        </CustomBox>
      </div>
    </>
  );
}

export default UserList;
