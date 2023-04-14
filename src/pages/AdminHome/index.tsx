import { Box } from '@mui/material';
import useModal from '../../hooks/useModal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimListAdmin from '../../components/admin/ClaimListAdmin';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';
import UserCard from '../../components/admin/ModalWindow/UserCard';
import LabalCard from '../../components/admin/ModalWindow/LabelCard';
import MainWindow from '../../components/admin/ModalWindow/mainWindow';
import { ClaimIdContext } from '../../custom/ClaimIdContext';

import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import Frame from '../../components/admin/ModalWindow/Frame.tsx/Frame';
import ClaimBox from '../../components/admin/ClaimBox';

import { motion } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';
import CustomBox from '../../components/CustomBox/CustomBox';
import YellowMashroom from '../../components/SVG/YellowMashroom';
import { useLocation } from 'react-router-dom';
import AdminUserView from '../AdminUserView';
import GeneralUserView from '../GeneralUserView';

type Props = {};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { Modal, handleOpen, handleClose } = useModal();
  const [query, setQuery] = useState('');
  const [claims, setClaims] = useState<Partial<Claim>[] | null>(null);
  const [isModalWindow, setIsModalWindow] = useState<boolean>(false);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [modalClaim, setModalClaim] = useState<Partial<Claim>>();
  // const [claims, setClaims] = useState<Partial<Claim>[]>([]);

  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  useEffect(() => {
    if (claims !== null) {
      const modalClaim = claims.filter((element) => element.id === claimId)[0];
      setModalClaim(modalClaim);
      handleOpen();
    } else {
      handleClose();
    }
  }, [claimId]);

  // const filteredClaims = () =>
  //   claims.filter((claim:Claim) =>
  //     claim.message?.toLowerCase().includes(query.toLowerCase())
  //   );

  return (
    // TODO: temporary styling until Mateus's task is done
    <>
      <ClaimIdContext.Provider
        value={{ claimId, setClaimId }}
      ></ClaimIdContext.Provider>
    </>
    // <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
    //   {/* TODO: temporary claim data */}
    //   <ClaimChat chatData={sampleClaimDetail.chats} />
    // </Box>
  );
};

export default AdminHome;
