import React, { useState, useEffect } from 'react';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, SelectChangeEvent } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UserCard from '../UserCard';
import { useAllContext } from '../../../../context/ClaimIdContext';
import LabelCard from '../LabelCard';
import styles from './mainWindow.module.scss';
import { Claim, ClaimDetail, ClaimLabel, User } from '../../../../types';
import ClaimChat from '../../../ClaimChat';
import sampleClaimDetail from '../../../../temp/sampleClaimDetail';
import './windowStyles.scss';
import ButtonComponent from '../../../MUI_comp/ButtonComponent';
import AddIcon from '@mui/icons-material/Add';
import axios, { AxiosResponse } from 'axios';
import SelectBoxCustom from '../../../MUI_comp/SelectBoxCustom';

import { motion, useCycle } from 'framer-motion';
import getAuthorizationValue from '../../../../helpers/getAuthorizationValue';

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
  const [currentClaim, setCurrentClaim] = useState<ClaimDetail | null>(null);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');

  useEffect(() => {
    return setCurrentClaim(claim);
  }, []);

  const selectLabel = (e: SelectChangeEvent<string>) => {
    const selectedLabel = labelsData?.data.labels.find(
      (label: ClaimLabel) => label._id === e.target.value
    );
    if (currentClaim!.labels!.find((label) => label._id === selectedLabel._id))
      return;

    attachLabelMutation.mutate([
      ...currentClaim!.labels.map((label) => label._id),
      selectedLabel._id,
    ]);
    setCurrentClaim((prev) => ({
      ...prev!,
      labels: [...prev!.labels, selectedLabel],
    }));
  };

  const selectMember = (e: SelectChangeEvent<string>) => {
    const selectedMember = adminUsersData?.data.users.find(
      (label: ClaimLabel) => label._id === e.target.value
    );
    if (
      currentClaim!.inChargeAdmins!.find(
        (admin) => admin._id === selectedMember._id
      )
    )
      return;

    assignAdminMutation.mutate(selectedMember._id);
    const newEntry = {
      _id: selectedMember._id,
      firstName: selectedMember.firstName,
      lastName: selectedMember.lastName,
    };

    setCurrentClaim((prev) => ({
      ...prev!,
      inChargeAdmins: [...prev!.inChargeAdmins, newEntry],
    }));
  };

  const getLabelList = () => {
    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/label/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const getAdminUserList = () => {
    return axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/list`,
      params: {
        role: 'admin',
      },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const addNewLabel = (): Promise<AxiosResponse<NewLabelResponseData>> => {
    return axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/label/create`,
      data: {
        name: newLabelName,
      },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const assignAdmin = (): Promise<AxiosResponse> => {
    return axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/${
        currentClaim!._id
      }/assign`,
      data: {
        inChargeAdmins: currentClaim!.inChargeAdmins.map((admin) => admin._id),
      },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const attachLabel = (labels: string[]): Promise<AxiosResponse> => {
    return axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/${
        currentClaim!._id
      }/changeLabel`,
      data: {
        labels,
      },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
  };

  const { data: labelsData, isLoading: isLabelLoading } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabelList,
  });

  const { data: adminUsersData, isLoading: isAdminUsersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAdminUserList,
  });

  const newLabelMutation = useMutation({
    mutationFn: addNewLabel,
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const attachLabelMutation = useMutation({
    mutationFn: attachLabel,
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const assignAdminMutation = useMutation({
    mutationFn: assignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(['claim-detail']);
    },
  });

  const filteredLabelOptions = () => {
    return labelsData?.data.labels.filter(
      (labelOption: ClaimLabel) =>
        !currentClaim!.labels.find((label) => label._id === labelOption._id)
    );
  };

  const filteredAdminOptions = () => {
    return adminUsersData?.data.users.filter(
      (adminOption: User) =>
        !currentClaim!.inChargeAdmins.find(
          (admin) => admin._id === adminOption._id
        )
    );
  };

  return (
    currentClaim && (
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
              ID: {claim._id}
            </p>
          </div>
          <div className="claim_description">
            <div className="desc">{claim.body}</div>
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
              {currentClaim &&
                currentClaim.labels?.map((label, i) => (
                  <LabelCard
                    name={label.name}
                    width={100}
                    height={50}
                    url={'/images/profileImg.jpg'}
                    color={'blue'}
                    sx={{
                      mt: '1rem',
                    }}
                    key={label._id}
                  ></LabelCard>
                ))}
              {labelsData && (
                <SelectBoxCustom
                  placeholder="Choose label"
                  options={filteredLabelOptions()}
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
              )}
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
                maxWidth: '240px',
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
                {currentClaim.inChargeAdmins?.map((member, i) => (
                  <div className="cards" key={member._id}>
                    <UserCard
                      name={`${member.firstName} ${member.lastName}`}
                      width={100}
                      height={40}
                      url={member.profileImg || ''}
                      edit={false}
                    ></UserCard>
                  </div>
                ))}
                {adminUsersData && (
                  <SelectBoxCustom
                    placeholder="Choose admin user"
                    options={filteredAdminOptions()}
                    optionKey={['firstName', 'lastName']}
                    name="labels"
                    color="orange"
                    onChange={selectMember}
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
                )}
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
                  ID: {claim._id}
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
                {currentClaim &&
                  currentClaim.labels?.map((label, i) => (
                    <LabelCard
                      name={label.name}
                      width={100}
                      height={50}
                      url={'/images/profileImg.jpg'}
                      color={'blue'}
                      sx={{
                        mt: '1rem',
                      }}
                      key={label._id}
                    ></LabelCard>
                  ))}
                {labelsData && (
                  <SelectBoxCustom
                    placeholder="Choose label"
                    options={filteredLabelOptions()}
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
                )}

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
                  {currentClaim.inChargeAdmins?.map((member, i) => (
                    <div className="cards" key={member._id}>
                      <UserCard
                        name={`${member.firstName} ${member.lastName}`}
                        width={100}
                        height={40}
                        url={member.profileImg || ''}
                        edit={false}
                      ></UserCard>
                    </div>
                  ))}
                  {adminUsersData && (
                    <SelectBoxCustom
                      placeholder="Choose admin user"
                      options={filteredAdminOptions()}
                      optionKey={['firstName', 'lastName']}
                      name="labels"
                      color="orange"
                      onChange={selectMember}
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
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          <Box
            className="chat"
            sx={{
              border: '1px solid #ccc',
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <ClaimChat claimId={claim._id} />
          </Box>
        </div>
      </div>
    )
  );
}

export default MainWindow;
