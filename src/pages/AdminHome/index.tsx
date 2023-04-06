import { Box } from '@mui/material';
import useModal from '../../hooks/useModal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimListAdmin from '../../components/admin/ClaimListAdmin';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim } from '../../types';
import sampleClaims from '../../temp/sampleClaims';
import UserCard from '../../components/admin/ModalWindow/UserCard';
import LabelCard from '../../components/admin/ModalWindow/LabelCard';
import MainWindow from '../../components/admin/ModalWindow/mainWindow';
import { ClaimIdContext } from '../../custom/ClaimIdContext';

import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import Frame from '../../components/admin/ModalWindow/Frame.tsx/Frame';
import ClaimBox from '../../components/admin/ClaimBox';

import { motion } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';
import CustomBox from '../../components/CustomBox/CustomBox';

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

  console.log(claimId, 'this is Id');

  // const filteredClaims = () =>
  //   claims.filter((claim:Claim) =>
  //     claim.message?.toLowerCase().includes(query.toLowerCase())
  //   );

  return (
    // TODO: temporary styling until Mateus's task is done
    <>
      <ClaimIdContext.Provider value={{ claimId, setClaimId }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{ position: 'absolute', width: '100vw', height: '100vh' }}
          >
            <Box
              sx={{
                height: '100vh',
                marginTop: '-5%',
                zIndex: '-1',
              }}
            >
              {/* TODO: temporary claim data */}
              {/* <ClaimChat chatData={sampleClaimDetail.chats} /> */}
              {/* {claims && <MainWindow claim={claims[0]}></MainWindow>} */}
              {claims && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <ClaimBox
                    width={25}
                    height={70}
                    label={'new claim'}
                    claims={claims}
                  ></ClaimBox>
                  <ClaimBox
                    width={25}
                    height={70}
                    label={'on progress'}
                    claims={claims}
                  ></ClaimBox>
                  <ClaimBox
                    width={25}
                    height={70}
                    label={'done'}
                    claims={claims}
                  ></ClaimBox>
                </div>
              )}
            </Box>
          </div>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={
              claimId !== ''
                ? { opacity: 1, zIndex: '50' }
                : { opacity: 0, zIndex: '-50' }
            }
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              // top: '-21vh',
              marginTop: '-10%',
            }}
          >
            {modalClaim && <ModalWindow claim={modalClaim}></ModalWindow>}
          </motion.div> */}
          <Modal innerBoxStyle={{ width: '100%', height: '100%' }}>
            {modalClaim && <MainWindow claim={modalClaim}></MainWindow>}
          </Modal>
        </div>
      </ClaimIdContext.Provider>
    </>
    // <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
    //   {/* TODO: temporary claim data */}
    //   <ClaimChat chatData={sampleClaimDetail.chats} />
    // </Box>
  );
};

export default AdminHome;
