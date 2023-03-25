import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography, Grid, Paper } from '@mui/material';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import Frame from '../Frame.tsx/Frame';
import Closebutton from '../../../SVG/Closebutton';
import UserCard from '../UserCard';
import LabalCard from '../LabelCard';

const parent3boxStyle = {
  width: '100%',
  height: '100%',
  color: 'white',
  display: 'flex',
  // backgroundColor: 'red',
};

function MainWindow() {
  const { companyData } = useSelector(selectCompanyData);
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
        }}
      >
        <Grid container spacing={2} sx={{ width: '100%', height: '100%' }}>
          <Grid
            container
            item
            spacing={5}
            xs={18}
            sm={6}
            direction="column"
            justifyContent="space-around"
            sx={parent3boxStyle}
          >
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={claimNumberStyle}>claim number: 8080</Box>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'red',
              }}
            >
              <Frame
                width={95}
                height={100}
                label={'claim detail'}
                // text={
                //   ';asldf;asldfkjs;dfl;asldkfj;alsk;dffffffffffffffffffffffffffffasldkfjas;dlfkaj;sdlkfj;asldkfj'
                // }
              ></Frame>
            </Grid>

            <Grid
              container
              item
              spacing={1}
              xs={0.5}
              sm={5}
              justifyContent="space-around"
              alignContent="center"
              // sx={{ backgroundColor: 'red' }}
            >
              <Grid
                item
                xs={11}
                sm={5}
                sx={{ width: '45%', height: '100%', overflow: 'hidden' }}
              >
                <Frame
                  width={100}
                  height={100}
                  label={'people'}
                  component={[
                    <UserCard
                      name={'jumpei iwatani'}
                      width={110}
                      height={40}
                      url={'/images/profileImg.jpg'}
                    ></UserCard>,
                    <UserCard
                      name={'jumpei iwatani'}
                      width={110}
                      height={40}
                      url={'/images/profileImg.jpg'}
                    ></UserCard>,
                    <UserCard
                      name={'jumpei iwatani'}
                      width={110}
                      height={40}
                      url={'/images/profileImg.jpg'}
                    ></UserCard>,
                  ]}
                ></Frame>
              </Grid>
              <Grid item xs={11} sm={5} sx={{ width: '45%', height: '100%' }}>
                <Frame
                  width={100}
                  height={100}
                  label={'labels'}
                  component={[
                    <LabalCard
                      name={'ok deal'}
                      width={120}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'blue'}
                    ></LabalCard>,
                    <LabalCard
                      name={'ok deal'}
                      width={120}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'blue'}
                    ></LabalCard>,
                    <LabalCard
                      name={'ok deal'}
                      width={120}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'blue'}
                    ></LabalCard>,
                    <LabalCard
                      name={'ok deal'}
                      width={120}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'red'}
                    ></LabalCard>,
                  ]}
                ></Frame>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={10.5}
            sm={5}
            sx={{
              marginTop: '6%',
              width: '100%',
              height: '90%',
              // backgroundColor: 'red',
              marginLeft: '5%',
            }}
          >
            <Frame width={100} height={100} label={'chat'}></Frame>
          </Grid>
          {/* <Grid item xs={1} sm={1} sx={{ marginTop: '1%' }}>
            <Closebutton></Closebutton>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default MainWindow;
