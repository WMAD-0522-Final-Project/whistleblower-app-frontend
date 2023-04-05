import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, lighten, useMediaQuery, useTheme } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';
import ClaimForm from '../../components/general/ClaimForm';
import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import useModal from '../../hooks/useModal';
import { Claim } from '../../types';
import TabsCustom from '../../components/MUI_comp/TabsCustom';

type Props = {};

const GeneralHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
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
        m: '5rem auto 1rem',
        maxWidth: '900px',
        [theme.breakpoints.up('lg')]: {
          m: '2rem auto',
        },
      }}
    >
      {isLg ? (
        <TabsCustom
          options={['Make Claim', 'Past Claims']}
          contents={[
            <ClaimForm />,
            <ClaimListGeneral onClaimClick={handleClaimClick} />,
          ]}
          sx={{
            bgcolor: lighten(companyData.themeColors.primary, 0.28),
            padding: '30px',
            borderRadius: '20px',
          }}
        />
      ) : (
        <>
          <ClaimForm />,
          <ClaimListGeneral
            onClaimClick={handleClaimClick}
            sx={{ mt: '3rem' }}
          />
        </>
      )}
      <Modal outerBoxStyle={{ maxWidth: '600px' }}>
        <ClaimChat chatData={currentClaim?.chats} />
      </Modal>
    </Box>
  );
};

export default GeneralHome;
