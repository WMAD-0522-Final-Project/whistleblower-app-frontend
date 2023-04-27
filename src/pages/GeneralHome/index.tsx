import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Box, lighten, useMediaQuery, useTheme } from '@mui/material';
import { selectCompanyData } from '../../RTK/companySlice';
import ClaimListGeneral from '../../components/general/ClaimListGeneral';
import ClaimForm from '../../components/general/ClaimForm';
import ClaimChat from '../../components/ClaimChat';
// import sampleClaimDetail from '../../temp/sampleClaimDetail';
import useModal from '../../hooks/useModal';
import TabsCustom from '../../components/MUI_comp/TabsCustom';
import localStorageHelper from '../../helpers/localStorageHelper';
import { ClaimMessageData } from '../../types';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';

type Props = {};

const GeneralHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const { handleOpen, Modal } = useModal();
  const [currentClaimId, setCurrentClaimId] = useState<string | null>(null);
  const [state, setState] = useState<number | null>(null);

  const getMessagesData = async (): Promise<
    AxiosResponse<{ messages: ClaimMessageData[] }>
  > => {
    const res = await axios({
      method: 'GET',
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/claim/${currentClaimId}/message/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });

    return res.data;
  };

  const {
    data,
    refetch,
    isFetching: isMessagesFetching,
  } = useQuery({
    queryFn: getMessagesData,
    queryKey: ['claim'],
    enabled: false,
  });

  const handleClaimClick = (claimId: string) => {
    setCurrentClaimId(claimId);
    handleOpen();
  };

  useEffect(() => {
    if (!currentClaimId) return;
    refetch();
  }, [currentClaimId]);

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
          currentState={(e) => setState(e)}
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
      {currentClaimId && !isMessagesFetching && (
        <Modal
          outerBoxStyle={{ maxWidth: '600px' }}
          onClose={() => setCurrentClaimId(null)}
        >
          <ClaimChat claimId={currentClaimId} />
        </Modal>
      )}
    </Box>
  );
};

export default GeneralHome;
