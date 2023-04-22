import { Box, Theme, useMediaQuery } from '@mui/material';
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
// import { useAllContext } from '../../custom/ClaimIdContext';
import { useAllContext } from '../../context/ClaimIdContext';
import ClaimChat from '../../components/ClaimChat';
import sampleClaimDetail from '../../temp/sampleClaimDetail';
import Frame from '../../components/admin/ModalWindow/Frame.tsx/Frame';
import ClaimBox from '../../components/admin/ClaimBox';

import { motion } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';
import CustomBox from '../../components/CustomBox/CustomBox';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Props = {};

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

const getClaimData = () =>
  axios({
    method: 'GET',
    url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/list?status=`,
  });

const changeStatus = () =>
  axios({
    method: 'PUT',
    url: `${
      import.meta.env.VITE_BACKEND_URL
    }/api/claim/:${claimId}/changeStatus`,
  });

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { Modal, handleOpen, handleClose } = useModal();
  const [query, setQuery] = useState('');
  const [claims, setClaims] = useState<Partial<Claim>[] | null>(null);
  const [isModalWindow, setIsModalWindow] = useState<boolean>(false);
  const { context, setContext } = useAllContext();
  const newClaim = 'unHandled';
  const inProgress = 'inProgress';
  const done = 'done';
  const [expandState, setExpandState] = useState(newClaim);
  const [modalClaim, setModalClaim] = useState<Partial<Claim> | null>(null);
  const [mobileHeight, setModileHeight] = useState({
    newClaim: 6,
    inProgress: 6,
    done: 6,
  });
  // const [claims, setClaims] = useState<Partial<Claim>[]>([]);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  useQuery({
    queryKey: ['getClaimData'],
    queryFn: getClaimData,
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (message) => {
      console.log(message);
    },
  });

  useEffect(() => {
    // fetch claim data from API
    setClaims(sampleClaims);
  }, []);

  useEffect(() => {
    if (claims !== null) {
      const modalClaim = claims?.filter(
        (element) => element._id === context.claimsId
      )[0];
      setModalClaim(modalClaim);
      handleOpen();
    } else {
      handleClose();
    }
  }, [context.claimsId]);

  // const filteredClaims = () =>
  //   claims.filter((claim: Claim) =>
  //     claim.message?.toLowerCase().includes(query.toLowerCase())
  //   );

  useEffect(() => {
    console.log(context, 'roren');
  }, [context.claimsId]);
  const columns = [
    {
      id: 'unHandled',
      width: matches ? 25 : 50,
      height: matches ? 70 : 6,
      label: 'New Claims',
    },
    {
      id: 'inProgress',
      width: matches ? 25 : 50,
      height: matches ? 70 : 6,
      label: 'In Progress',
    },
    {
      id: 'done',
      width: matches ? 25 : 50,
      height: matches ? 70 : 6,
      label: 'Done',
    },
  ];

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
                  style={
                    matches
                      ? {
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                        }
                      : {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          width: '100%',
                          height: '90%',
                        }
                  }
                >
                  {columns.map((column) => (
                    <ClaimBox
                      animate={
                        !matches
                          ? expandState === column.id
                            ? { height: '70%' }
                            : { height: '6%' }
                          : { height: '70%' }
                      }
                      transition={{ duration: 0.5 }}
                      onHoverStart={(e) => {
                        setExpandState(column.id);
                      }}
                      onTap={(e) => {
                        setExpandState(column.id);
                      }}
                      width={column.width}
                      height={column.height}
                      label={column.label}
                      id={column.id}
                      sx={
                        matches
                          ? {}
                          : {
                              width: '95%',
                              height: '10px',
                              marginTop: '1%',
                            }
                      }
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

          {modalClaim && (
            <Modal
              outerBoxStyle={{ maxWidth: '1200px' }}
              innerBoxStyle={{ width: '100%', height: '100%' }}
            >
              <MainWindow claim={modalClaim}></MainWindow>
            </Modal>
          )}
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
