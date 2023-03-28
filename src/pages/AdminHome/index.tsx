import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimList from '../../components/admin/ClaimList';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';
import UserCard from '../../components/admin/ModalWindow/UserCard';
import LabalCard from '../../components/admin/ModalWindow/LabelCard';
import MainWindow from '../../components/admin/ModalWindow/mainWindow';

type Props = {};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [claims, setClaims] = useState<Partial<Claim>[] | null>(null);

  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  console.log(claims);
  if (claims === null) console.log('true');

  return (
    // TODO: temporary styling until Mateus's task is done
    <>
      {/* <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
        <ClaimList claims={claims} />
      </Box> */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <UserCard
          url={'/images/profileImg.jpg'}
          name={'jumpei iwatani'}
          width={50}
          height={10}
        ></UserCard>
        <LabalCard></LabalCard> */}
        {claims && <MainWindow claim={claims[0]}></MainWindow>}
      </div>
    </>
  );
};

export default AdminHome;
