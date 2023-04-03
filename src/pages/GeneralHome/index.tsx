import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';
import ClaimForm from '../../components/general/ClaimForm';
import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import useModal from '../../hooks/useModal';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import { Claim } from '../../types';
import TabsCustom from '../../components/MUI_comp/TabsCustom';

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

  const logout = () => {
    // logout
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      component="main"
      sx={{
        m: '5rem auto',
        maxWidth: '600px',
        [theme.breakpoints.up('lg')]: {
          m: '2rem auto',
        },
      }}
    >
      {matches ? (
        <TabsCustom
          options={['Make Claim', 'Past Claims']}
          contents={[
            <ClaimForm />,
            <ClaimListGeneral onClaimClick={handleClaimClick} />,
          ]}
          sx={{
            '& .MuiBox-root': {
              mb: '2rem',
            },
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
      <ButtonComponent
        customColor={companyData.themeColors.secondary}
        type="submit"
        onClick={logout}
        sx={{
          boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.2)',
          display: 'block',
          mt: '1rem',
          p: '0.8rem 0',
          color: companyData.themeColors.primary,
          fontWeight: '600',
          m: '3rem auto 0',
          maxWidth: '500px',
          width: '90%',
        }}
      >
        Logout
      </ButtonComponent>
      <Modal outerBoxStyle={{ maxWidth: '600px' }}>
        <ClaimChat chatData={currentClaim?.chats} />
      </Modal>
    </Box>
  );
};

export default GeneralHome;
