import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';
import ClaimForm from '../../components/general/ClaimForm';
import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import useModal from '../../hooks/useModal';
import { Claim } from '../../types';

type Props = {};

const GeneralHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { handleOpen, Modal } = useModal();
  const [currentClaim, setCurrentClaim] = useState<Claim | undefined>(
    undefined
  );

  const handleClaimClick = () => {
    // fetch chat data
    setCurrentClaim(sampleClaimDetail as Claim);
    handleOpen();
  };

  return (
    <Box
      component="main"
      sx={{
        m: '5rem auto',
        maxWidth: '450px',
      }}
    >
      <ClaimForm />
      <ClaimListGeneral onClaimClick={handleClaimClick} />
      <Modal outerBoxStyle={{ maxWidth: '600px' }}>
        <ClaimChat chatData={currentClaim?.chats} />
      </Modal>
    </Box>
  );
};

export default GeneralHome;
