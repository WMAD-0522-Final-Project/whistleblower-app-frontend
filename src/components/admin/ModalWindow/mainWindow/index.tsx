import React, { useEffect } from 'react';
import { Component, useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import Frame from '../Frame.tsx/Frame';
import Closebutton from '../../../SVG/Closebutton';
import UserCard from '../UserCard';
import { useClaimContext } from '../../../../custom/ClaimIdContext';
// import { MotionUserCard } from '../UserCard';
import LabelCard from '../LabelCard';
import styles from './mainWindow.module.scss';
import { Claim, ClaimLabel } from '../../../../types';
import ClaimChat from '../../../ClaimChat';
import sampleClaimDetail from '../../../../temp/sampleClaimDetail';
import ButtonComponent from '../../../MUI_comp/ButtonComponent';
import axios, { AxiosResponse } from 'axios';
import localStorageHelper from '../../../../helpers/localStorageHelper';
import SelectBoxCustom from '../../../MUI_comp/SelectBoxCustom';
import SelectBoxLabel from '../../../SelectBoxLabel';

type Props = {
  claim: Partial<Claim>;
};

interface NewLabelResponseData {
  message: string;
  label: {
    name: string;
    companyId: string;
  };
}

function MainWindow({ claim }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  const { claimId, setClaimId } = useClaimContext();
  const queryClient = useQueryClient();
  const [activeClaim, setActiveClaim] = useState<Claim>(null);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
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

  useEffect(() => {
    setActiveClaim(claim);
  }, []);

  // useEffect(() => {
  //   console.log('activeClaim', activeClaim);
  // }, [activeClaim]);

  const closeModalWindow = () => {
    setClaimId(null);
  };

  const selectLabel = (e) => {
    const name = labelData?.data.labels.find(
      (label: ClaimLabel) => label._id === e.target.value
    ).name;
    if (activeClaim.labels.includes(name)) return;

    // add as active label
    setActiveClaim((prev) => ({
      ...prev,
      labels: [...prev.labels, name],
    }));
  };

  const getLabelList = () => {
    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/label/list`,
      headers: {
        Authorization: `Bearer ${localStorageHelper('get', 'token')?.data}`,
      },
    });
  };

  const { data: labelData, isLoading: isLabelLoading } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabelList,
  });

  const addNewLabel = (): Promise<AxiosResponse<NewLabelResponseData>> => {
    return axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/label/create`,
      data: {
        name: newLabelName,
      },
      headers: {
        Authorization: `Bearer ${localStorageHelper('get', 'token')?.data}`,
      },
    });
  };

  const newLabelMutation = useMutation({
    mutationFn: addNewLabel,
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  useQuery;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
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
                {activeClaim && (
                  <Frame
                    width={100}
                    height={100}
                    label={'labels'}
                    // component={[
                    //   <LabelCard
                    //     name={'ok deal'}
                    //     width={110}
                    //     height={50}
                    //     url={'/images/profileImg.jpg'}
                    //     color={'blue'}
                    //   ></LabelCard>,
                    // ]}
                    component={activeClaim.labels?.map((label, i) => {
                      return i < activeClaim.labels?.length! - 1 ? (
                        <LabelCard
                          name={label}
                          width={110}
                          height={50}
                          url={'/images/profileImg.jpg'}
                          color={'blue'}
                          sx={{
                            mt: '1rem',
                          }}
                        ></LabelCard>
                      ) : (
                        <>
                          {labelData && (
                            <SelectBoxCustom
                              placeholder="Choose label"
                              // all labels company have
                              options={labelData.data.labels}
                              name="labels"
                              color="orange"
                              onChange={selectLabel}
                              menuItemSx={{ fontSize: '0.8rem' }}
                              sx={{
                                borderRadius: '10px',
                                mt: '1rem',
                                fontSize: '0.8rem',
                                '& .MuiSelect-select': {
                                  pt: '0.4rem',
                                },
                              }}
                            />
                          )}
                          <Box
                            component="button"
                            onClick={() => setShowLabelForm(true)}
                            sx={{
                              backgroundColor:
                                companyData.themeColors.secondary,
                              borderRadius: '2rem',
                              border: `5px solid ${companyData.themeColors.primary}`,
                              cursor: 'pointer',
                              mt: '1rem',
                              padding: '0.2rem 0.4rem',
                              width: '100%',
                            }}
                          >
                            <Typography
                              color={companyData.themeColors.primary}
                              fontSize={'0.8rem'}
                            >
                              + Add New
                            </Typography>
                          </Box>
                          {showLabelForm && (
                            <Box
                              sx={{
                                background: '#ddd',
                                borderRadius: '6px',
                                mt: '0.2rem',
                                padding: '0.4rem',
                              }}
                            >
                              <TextField
                                id="outlined-multiline-static"
                                label=""
                                placeholder="Enter label name"
                                name="label"
                                onChange={(e) =>
                                  setNewLabelName(e.target.value)
                                }
                                sx={{
                                  background: '#fff',
                                  border: `2px solid ${companyData.themeColors.primary}`,
                                  borderRadius: '5px',
                                  mt: '0.4rem',
                                  outline: 'none',
                                  width: '100%',
                                  '& input': {
                                    fontSize: '0.8rem',
                                    padding: '0.6rem 0.4rem',
                                  },
                                  '& fieldset': {
                                    border: 'none',
                                  },
                                }}
                              />
                              <ButtonComponent
                                customColor={companyData.themeColors.primary}
                                type="submit"
                                onClick={() => {
                                  newLabelMutation.mutate();
                                }}
                                sx={{
                                  p: '0.2rem 0',
                                  mt: '0.2rem',
                                  color: companyData.themeColors.secondary,
                                  fontSize: '0.8rem',
                                  width: '100%',
                                }}
                              >
                                Add
                              </ButtonComponent>
                            </Box>
                          )}
                        </>
                      );
                    })}
                  ></Frame>
                )}
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
