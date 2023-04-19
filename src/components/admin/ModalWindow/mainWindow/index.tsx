import React, { useState, useEffect } from 'react';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Frame from '../Frame.tsx/Frame';
import Closebutton from '../../../SVG/Closebutton';
import UserCard from '../UserCard';
import { useAllContext } from '../../../../custom/ClaimIdContext';
// import { MotionUserCard } from '../UserCard';
import LabelCard from '../LabelCard';
import styles from './mainWindow.module.scss';
import { Claim, ClaimLabel } from '../../../../types';
import ClaimChat from '../../../ClaimChat';
import sampleClaimDetail from '../../../../temp/sampleClaimDetail';
import './windowStyles.scss';
import ButtonComponent from '../../../MUI_comp/ButtonComponent';
import AddIcon from '@mui/icons-material/Add';
import axios, { AxiosResponse } from 'axios';
import localStorageHelper from '../../../../helpers/localStorageHelper';
import SelectBoxCustom from '../../../MUI_comp/SelectBoxCustom';
import SelectBoxLabel from '../../../SelectBoxLabel';

import { motion, useCycle } from 'framer-motion';

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
  const [isOpen, setIsOpen] = useState(false);

  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const queryClient = useQueryClient();
  const [activeClaim, setActiveClaim] = useState<Claim | null>(null);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');

  const closeModalWindow = () => {
    setContext({ userId: '', claimsId: '' });
  };

  useEffect(() => {
    setActiveClaim(claim);
  }, []);

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

  return (
    <div className="super">
      <div className="side left">
        <div className="claim_id">
          <h1
            style={{ color: companyData.themeColors.primary }}
            className="title"
          >
            Description
          </h1>
          <p style={{ color: companyData.themeColors.primary }}>
            ID: {claim.id}
          </p>
        </div>
        <div className="claim_description">
          <div className="desc">
            {claim.message}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, earum
            animi! Ab illo, autem praesentium modi eius dicta ut ea culpa
            recusandae commodi deleniti fugit tempore corrupti. In, ipsum optio!
            Lorem ipsum dolor sit consectetur adipisicing elit. Aut nisi
            possimus incidunt commodi dignissimos animi eaque ullam quos placeat
            veritatis alias inventore unde asperiores aperiam, fugit corporis
            reprehenderit error laboriosam. Lorem ipsum dolor sit consectetur
            adipisicing elit. Aut nisi possimus incidunt commodi dignissimos
            animi eaque ullam quos placeat veritatis alias inventore unde
            asperiores aperiam, fugit corporis reprehenderit error laboriosam.
          </div>
        </div>
        <Box className="extras">
          <Box
            className="extra extra_left"
            sx={{
              maxWidth: '240px',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            <p
              className="titles_extras"
              style={{
                color: companyData.themeColors.primary,
                fontWeight: 'bolder',
              }}
            >
              Labels
            </p>

            {activeClaim &&
              activeClaim.labels?.map((label, i) => {
                return i < activeClaim.labels?.length! - 1 ? (
                  <LabelCard
                    name={label}
                    width={100}
                    height={50}
                    url={'/images/profileImg.jpg'}
                    color={'blue'}
                    sx={{
                      mt: '1rem',
                    }}
                  ></LabelCard>
                ) : (
                  labelData && (
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
                        mt: '2rem',
                        fontSize: '0.8rem',
                        '& .MuiSelect-select': {
                          pt: '0.4rem',
                        },
                      }}
                    />
                  )
                );
              })}
            <Box
              component="button"
              onClick={() => setShowLabelForm(true)}
              sx={{
                backgroundColor: companyData.themeColors.secondary,
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
                  mt: '0.6rem',
                  padding: '0.6rem',
                }}
              >
                <TextField
                  id="outlined-multiline-static"
                  label=""
                  placeholder="Enter label name"
                  name="label"
                  onChange={(e) => setNewLabelName(e.target.value)}
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
          </Box>
          <Box
            className="extra extra_right"
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            <p
              className="titles_extras"
              style={{
                color: companyData.themeColors.primary,
                fontWeight: 'bolder',
              }}
            >
              Members
            </p>
            <div className="members">
              {claim.members?.map((member, i) => {
                return (
                  <>
                    <div className="cards">
                      <UserCard
                        name={member.userId}
                        width={100}
                        height={40}
                        url={member.avatarUrl}
                        edit={false}
                      ></UserCard>
                    </div>
                  </>
                );
              })}
            </div>
          </Box>
        </Box>
      </div>
      <div className="side chat_c">
        <motion.div
          whileTap={isOpen ? {} : { scale: 0.9 }}
          className="more_info"
        >
          <ButtonComponent
            customColor={`${companyData.themeColors.primary}`}
            textColor="white"
            className="mobileMenuToggler"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <AddIcon />
          </ButtonComponent>
          <div
            className="mobile_extras"
            style={{
              display: isOpen ? 'flex' : 'none',
            }}
          >
            <div className="claim_id">
              <h1
                style={{ color: companyData.themeColors.primary }}
                className="title"
              >
                Description
              </h1>
              <p style={{ color: companyData.themeColors.primary }}>
                ID: {claim.id}
              </p>
            </div>
            <div className="claim_description">
              <div className="desc">{claim.message}</div>
            </div>
            <Box
              className="extra extra_left"
              sx={{
                maxWidth: '240px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <p
                className="titles_extras"
                style={{
                  color: companyData.themeColors.primary,
                  fontWeight: 'bolder',
                }}
              >
                Labels
              </p>

              {activeClaim &&
                activeClaim.labels?.map((label, i) => {
                  return i < activeClaim.labels?.length! - 1 ? (
                    <LabelCard
                      name={label}
                      width={100}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'blue'}
                      sx={{
                        mt: '1rem',
                      }}
                    ></LabelCard>
                  ) : (
                    labelData && (
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
                          mt: '2rem',
                          fontSize: '0.8rem',
                          '& .MuiSelect-select': {
                            pt: '0.4rem',
                          },
                        }}
                      />
                    )
                  );
                })}
              <Box
                component="button"
                onClick={() => setShowLabelForm(true)}
                sx={{
                  backgroundColor: companyData.themeColors.secondary,
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
                    mt: '0.6rem',
                    padding: '0.6rem',
                  }}
                >
                  <TextField
                    id="outlined-multiline-static"
                    label=""
                    placeholder="Enter label name"
                    name="label"
                    onChange={(e) => setNewLabelName(e.target.value)}
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
            </Box>
            <div className="extra extra_rigth" style={{ marginTop: '10px' }}>
              <p
                className="titles_extras"
                style={{
                  color: companyData.themeColors.primary,
                  fontWeight: 'bolder',
                }}
              >
                Members
              </p>
              <div className="members">
                {claim.members?.map((member, i) => {
                  return (
                    <>
                      <div className="cards">
                        <UserCard
                          name={member.userId}
                          width={100}
                          height={40}
                          url={member.avatarUrl}
                          edit={false}
                        ></UserCard>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="chat">
          <ClaimChat chatData={sampleClaimDetail.chats} />
        </div>
      </div>
    </div>
  );
}

export default MainWindow;
