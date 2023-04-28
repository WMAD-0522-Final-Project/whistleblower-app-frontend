import { useEffect, useState } from 'react';
import { AlertColor, Box, Theme, useMediaQuery } from '@mui/material';
import useModal from '../../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Claim, ClaimDetail } from '../../types';
import MainWindow from '../../components/admin/ModalWindow/mainWindow';
// import { useAllContext } from '../../custom/ClaimIdContext';
import { useAllContext } from '../../context/ClaimIdContext';
import ClaimBox from '../../components/admin/ClaimBox';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import checkPermission from '../../helpers/checkPermission';
import { UserPermissionOption } from '../../types/enums';
import { selectUserData } from '../../RTK/userDataSlice';
import AlertCustom from '../../components/MUI_comp/AlertCustom';

type Props = {};

const removeFrom = (column: Claim[], index: number): [Claim, Claim[]] => {
  const output = [...column];
  const [removedItem] = output.splice(index, 1);
  return [removedItem, output];
};

const addTo = (column: Claim[], index: number, item: Claim) => {
  const output: Claim[] = [...column];
  output.splice(index, 0, item);
  return output;
};

const getClaimData = (): Promise<AxiosResponse> => {
  const authorizationValue = getAuthorizationValue();

  return axios({
    method: 'GET',
    url: `${import.meta.env.VITE_BACKEND_URL}/api/claim/list`,
    headers: {
      Authorization: authorizationValue,
    },
  });
};

const putStatus = ({
  claimId,
  status,
}: {
  claimId: string;
  status: string;
}): Promise<AxiosResponse> => {
  const authorizationValue = getAuthorizationValue();
  return axios({
    method: 'PUT',
    url: `${
      import.meta.env.VITE_BACKEND_URL
    }/api/claim/${claimId}/changeStatus`,
    headers: {
      Authorization: authorizationValue,
    },
    data: {
      status,
    },
  });
};

const AdminHome = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { userData } = useSelector(selectUserData);
  const { Modal, handleOpen, handleClose, open } = useModal();
  const [alert, setAlert] = useState({
    type: '' as AlertColor,
    message: '',
  });
  const [query, setQuery] = useState('');
  const [claims, setClaims] = useState<ClaimDetail[] | null>(null);
  const [isModalWindow, setIsModalWindow] = useState<boolean>(false);
  const { context, setContext } = useAllContext();
  const newClaim = 'unHandled';
  const inProgress = 'inProgress';
  const done = 'done';
  const [expandState, setExpandState] = useState(newClaim);
  const [modalClaim, setModalClaim] = useState<Partial<ClaimDetail> | null>(
    null
  );
  const [mobileHeight, setModileHeight] = useState({
    newClaim: 6,
    inProgress: 6,
    done: 6,
  });
  // const [claims, setClaims] = useState<Partial<Claim>[]>([]);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const claimQuery = useQuery({
    queryKey: ['getClaimData'],
    queryFn: getClaimData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  let fetchedClaims = claimQuery.data?.data.claims;

  useEffect(() => {
    claimQuery.data && setClaims(fetchedClaims);
  }, [claimQuery.data]);

  useEffect(() => {
    setContext((context) => ({
      ...context,
      claimsId: null,
    }));
  }, [open]);

  // const getClaims = async (): Promise<AxiosResponse<Claim[]>> => {
  //   const res = await axios({
  //     method: 'GET',
  //     url: `${import.meta.env.VITE_BACKEND_URL}/api/user/list`,
  //     headers: {
  //       Authorization: getAuthorizationValue(),
  //     },
  //   });
  //   return res.data;
  // };

  // const { data: claimsAxios } = useQuery({
  //   queryFn: getClaims,
  //   queryKey: ['claims'],
  // });

  // useEffect(() => {
  //   // fetch claim data from API
  //   if (claimsAxios) setClaims(claimsAxios);
  // }, [claimsAxios]);

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
  const columns = [
    {
      id: 'unHandled',
      width: matches ? 30 : 50,
      height: matches ? 70 : 6,
      label: 'New Claims',
    },
    {
      id: 'inProgress',
      width: matches ? 30 : 50,
      height: matches ? 70 : 6,
      label: 'In Progress',
    },
    {
      id: 'done',
      width: matches ? 30 : 50,
      height: matches ? 70 : 6,
      label: 'Done',
    },
  ];

  const statusMutation = useMutation({
    mutationFn: putStatus,
  });

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // check permission
    if (
      !checkPermission(
        UserPermissionOption.CASE_MANAGEMENT,
        userData.permissions
      )
    ) {
      setAlert({
        type: 'error',
        message: "You don't have permission for this action",
      });
      return;
    }

    let claimsCopy = [...claims!];

    const sourceColumn = claimsCopy.filter(
      (claim) => claim.status === result.source.droppableId
    );

    const destinationColumn = claimsCopy.filter(
      (claim) => claim.status === result.destination!.droppableId
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

    setClaims(claimsCopy);

    statusMutation.mutate({
      claimId: removedClaim._id,
      status: result.destination.droppableId,
    });
  };

  return (
    claims && (
      // TODO: temporary styling until Mateus's task is done
      <>
        {alert.message && (
          <AlertCustom text={alert.message} type={alert.type} />
        )}
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
                {claimQuery.isLoading && <>Loading...</>}
                {claimQuery.isError && <>{claimQuery.error}</>}
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
    )
  );
};

export default AdminHome;
function json2mq(arg0: {
  minWidth: number;
}): string | ((theme: unknown) => string) {
  throw new Error('Function not implemented.');
}
