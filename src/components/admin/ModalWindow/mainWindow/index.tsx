import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography, Grid, Paper } from '@mui/material';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import Frame from '../Frame.tsx/Frame';
import Closebutton from '../../../SVG/Closebutton';
import UserCard from '../UserCard';
import { useClaimContext } from '../../../../custom/ClaimIdContext';
// import { MotionUserCard } from '../UserCard';
import LabalCard from '../LabelCard';
import styles from './mainWindow.module.scss';
import { Claim } from '../../../../types';
import ClaimChat from '../../../ClaimChat';
import sampleClaimDetail from '../../../../temp/sampleClaimDetail';
type Props = {
  claim: Partial<Claim>;
};

function MainWindow({ claim }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  const { claimId, setClaimId } = useClaimContext();
  const claimNumberStyle = {
    width: '200px',
    height: '90%',
    background: `${companyData.themeColors.primary}`,
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3%',

    // backgroundColor: 'red',
  };
  const closeModalWindow = () => {
    setClaimId('');
  };
  return (
    <>
      <Box
        sx={{
          width: '90%',
          height: '90%',
          backgroundColor: 'white',
          borderRadius: '20px',
          border: `${companyData.themeColors.primary} 3px solid`,
          overflow: 'scroll',
          position: 'relative',
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          <Grid
            container
            item
            spacing={7}
            xs={12}
            sm={6}
            direction="column"
            justifyContent="space-around"
            sx={{
              width: '100%',
              height: '100%',
              color: 'white',
              display: 'flex',
              // backgroundColor: 'red',
            }}
          >
            <Grid item xs={1} sm={2}>
              <Box sx={claimNumberStyle}>claim id: {claim.id}</Box>
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              justifyContent="space-around"
              sx={{
                display: 'flex',
              }}
            >
              <Frame
                width={95}
                height={100}
                label={'claim detail'}
                claim={claim}
              ></Frame>
            </Grid>

            <Grid
              container
              item
              spacing={1}
              xs={5}
              sm={5}
              justifyContent="space-around"
              // alignContent="space-around"
              // sx={{ backgroundColor: 'red' }}
            >
              <Grid item xs={12} sm={5} sx={{ width: '45%', height: '100%' }}>
                <Frame
                  width={100}
                  height={100}
                  label={'people'}
                  component={claim.members?.map((member, i) => {
                    return (
                      <UserCard
                        name={member.userId}
                        width={110}
                        height={40}
                        url={member.avatarUrl}
                      ></UserCard>
                    );
                  })}
                ></Frame>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ width: '45%', height: '100%' }}>
                <Frame
                  width={100}
                  height={100}
                  label={'labels'}
                  // component={[
                  //   <LabalCard
                  //     name={'ok deal'}
                  //     width={110}
                  //     height={50}
                  //     url={'/images/profileImg.jpg'}
                  //     color={'blue'}
                  //   ></LabalCard>,
                  // ]}
                  component={claim.labels?.map((label, i) => {
                    return (
                      <LabalCard
                        name={label}
                        width={110}
                        height={50}
                        url={'/images/profileImg.jpg'}
                        color={'blue'}
                      ></LabalCard>
                    );
                  })}
                ></Frame>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={styles.chat}
            xs={12}
            sm={5}
            sx={{
              marginTop: '3%',
              width: '100%',
              height: '90%',
              // backgroundColor: 'red',
              // marginLeft: '5%',
            }}
          >
            <Frame
              width={100}
              height={100}
              label={'chat'}
              component={[<ClaimChat chatData={sampleClaimDetail.chats} />]}
            ></Frame>
          </Grid>
          <Grid item xs={1} sm={1} sx={{ marginTop: '1%' }}>
            <div onClick={closeModalWindow}>
              <Closebutton></Closebutton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MainWindow;
