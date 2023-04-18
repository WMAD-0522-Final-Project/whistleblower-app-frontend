import { Box, useMediaQuery } from '@mui/material';
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
import { DragDropContext } from 'react-beautiful-dnd';

type Props = {};

const columns = [
  { id: 'unHandled', width: 25, height: 70, label: 'New Claims' },
  { id: 'inProgress', width: 25, height: 70, label: 'In Progress' },
  { id: 'done', width: 25, height: 70, label: 'Done' },
];

const removeFrom = (column, index: number) => {
  const output = [...column];
  const [removedItem] = output.splice(index, 1);
  return [removedItem, output];
};

const addTo = (column, index: number, item) => {
  const output = [...column];
  output.splice(index, 0, item);
  return output;
};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { Modal, handleOpen, handleClose } = useModal();
  const [query, setQuery] = useState('');
  const [claims, setClaims] = useState<Partial<Claim>[] | null>();
  const [isModalWindow, setIsModalWindow] = useState<boolean>(false);
  const [claimId, setClaimId] = useState<string | null>(null);

  const [modalClaim, setModalClaim] = useState<Partial<Claim>>({
    id: 'lkjhgfdsa',
    submissionDate: '2023/04/02',
    message: 'The Curry rice in the cafeteria is terrible',
    labels: ['high priority', 'custom label 2'],
    category: 'category 1',
    members: [
      {
        userId: 'asdfghjkl',
        avatarUrl: '/images/profileImg.jpg',
      },
      {
        userId: 'asdfghjkl2',
        avatarUrl: '/images/profileImg.jpg',
      },
      {
        userId: 'asdfghjkl3',
        avatarUrl: '/images/profileImg.jpg',
      },
    ],
    status: 'inProgress',
  });
  // const [claims, setClaims] = useState<Partial<Claim>[]>([]);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  useEffect(() => {
    console.log(matches, 'metS');
  }, [matches]);
  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  // useEffect(() => {
  //   if (claims !== null) {
  //     const modalClaim = claims.filter((element) => element.id === claimId)[0];
  //     setModalClaim(modalClaim);
  //     handleOpen();
  //   } else {
  //     handleClose();
  //   }
  // }, [claimId]);

  // console.log(claimId, 'this is Id');

  // const filteredClaims = () =>
  //   claims.filter((claim:Claim) =>
  //     claim.message?.toLowerCase().includes(query.toLowerCase())
  //   );

  const handleOnDragEnd = function (result) {
    if (!result.destination) return;
    let claimsCopy = [...claims];

    const sourceColumn = claimsCopy.filter(
      (claim) => claim.status === result.source.droppableId
    );

    const destinationColumn = claimsCopy.filter(
      (claim) => claim.status === result.destination.droppableId
    );

    const [removedClaim, removedColumn] = removeFrom(
      sourceColumn,
      result.source.index
    );

    removedClaim.status = result.destination.droppableId;

    const newDestinationColumn = addTo(
      destinationColumn,
      result.destination.index,
      removedClaim
    );

    claimsCopy = [
      ...new Set([...claimsCopy, ...newDestinationColumn, ...removedColumn]),
    ];

    console.log('claimsCopy:', claimsCopy);

    setClaims(claimsCopy);
  };

  return (
    // TODO: temporary styling until Mateus's task is done
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
            }}
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
                  {columns.map((column) => (
                    <ClaimBox
                      width={column.width}
                      height={column.height}
                      label={column.label}
                      id={column.id}
                      key={column.id}
                      claims={claims.filter(
                        (claim) => claim.status === column.id
                      )}
                    />
                  ))}
                </div>
              )}
            </Box>
          </div>

          <motion.div
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
            <Modal innerBoxStyle={{ width: '100%', height: '100%' }}>
              <MainWindow claim={modalClaim}></MainWindow>
            </Modal>
          </motion.div>
        </div>
      </DragDropContext>
    </>
    // <Box sx={{ backgroundColor: '#fff', height: '100vh' }}>
    //   {/* TODO: temporary claim data */}
    //   <ClaimChat chatData={sampleClaimDetail.chats} />
    // </Box>
  );
};

export default AdminHome;
function json2mq(arg0: {
  minWidth: number;
}): string | ((theme: unknown) => string) {
  throw new Error('Function not implemented.');
}
