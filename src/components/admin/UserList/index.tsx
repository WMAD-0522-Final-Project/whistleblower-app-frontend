import * as React from 'react';
import { Component, useState } from 'react';
import CustomBox from '../../CustomBox/CustomBox';
import SearchBox from '../../SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import sampleUserDatas from '../../../temp/sampleUserDatas';
import UserCard from '../ModalWindow/UserCard';

function UserList() {
  const [text, setText] = useState('');
  const { companyData } = useSelector(selectCompanyData);

  return (
    <>
      <CustomBox sx={{ height: '90%', width: '100%' }}>
        <SearchBox
          onChange={(e) => setText(e.target.value)}
          sx={{ width: 300, height: 50 }}
        ></SearchBox>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'relative',
            overflow: 'scroll',
            marginTop: '6%',
          }}
        >
          {sampleUserDatas.map((user, i) => {
            return (
              <>
                <UserCard
                  name={`${user.firstName} ${user.lastName}`}
                  width={70}
                  height={50}
                  url={user.avatarUrl}
                  edit={true}
                  sx={{ marginBottom: '20px' }}
                ></UserCard>
              </>
            );
          })}
        </div>
      </CustomBox>
    </>
  );
}

export default UserList;
