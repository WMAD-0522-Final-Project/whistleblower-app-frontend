import React, {
  FormEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { AlertColor, Avatar, Box, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { AxiosCustomError, Chat } from '../../types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectUserData } from '../../RTK/userDataSlice';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import AlertCustom from '../MUI_comp/AlertCustom';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import formatDatetime from '../../helpers/formatDatetime';

type Props = {
  claimId: string;
  chatData: Chat[] | undefined;
};

interface NewClaimResponseData {
  message: string;
  msg: { [key: string]: any };
}
interface MessagesResponseData {
  messages: Chat[];
}

const ClaimChat = ({ claimId, chatData }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { userData } = useSelector(selectUserData);
  const [alert, setAlert] = useState({
    type: '' as AlertColor,
    message: '',
  });
  const [messageList, setMessageList] = useState<Chat[]>(chatData || []);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLElement>(null);

  const msgStyle = {
    borderRadius: '30px',
    fontSize: '0.9rem',
    p: '0.4rem 1.2rem',
  };

  const getAllMessages = async (): Promise<MessagesResponseData> => {
    const res = await axios({
      method: 'GET',
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/claim/${claimId}/message/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
    return res.data;
  };

  const setReadNewMessage = async () => {
    const res = await axios({
      method: 'PUT',
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/claim/${claimId}/message/changeReadStatus`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
      data: { hasNewComment: false },
    });
    return res.data;
  };

  const sendNewMessage = async (
    message: string
  ): Promise<AxiosResponse<NewClaimResponseData>> => {
    const res = await axios({
      method: 'POST',
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/claim/${claimId}/message/create`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
      data: { message },
    });
    return res.data;
  };

  const { data: messageData } = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
    staleTime: 1000 * 60 * 10,
    onError: () => {
      console.log('Failed to fetch chat message data');
    },
  });

  const setReadNewMessageMutation = useMutation({
    mutationFn: setReadNewMessage,
    onSuccess: (data) => {
      // invalidate claim list
    },
    onError: (data) => {
      console.log('Error:', error);
    },
  });

  const sendNewMessageMutation = useMutation({
    mutationFn: sendNewMessage,
    onSuccess: (data) => {
      setMessageList((prev) => [
        ...prev,
        {
          _id: uuidv4(),
          claimId,
          user: {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImg: userData.profileImg,
          },
          message,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
      setMessage('');
    },
    onError: (data: AxiosCustomError) => {
      setAlert({
        type: 'error',
        message: 'Submission failed.. Please try again.',
      });
      console.log('Error:', data.response!.data.message);
    },
  });

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();
    if (!message) return;
    sendNewMessageMutation.mutate(message);
  };

  useEffect(() => {
    setReadNewMessageMutation.mutate();
  }, []);

  useEffect(() => {
    if (messageData) {
      setMessageList(messageData.messages);
    }
  }, [messageData]);

  useLayoutEffect(() => {
    const scroll =
      scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight;
    scrollRef.current!.scrollTo(0, scroll);
  }, [messageList]);

  return (
    <Box sx={{ height: '100%', overflowY: 'hidden', width: '100%' }}>
      {alert.message && <AlertCustom text={alert.message} type={alert.type} />}
      <Box
        ref={scrollRef}
        sx={{
          height: '80%',
          overflowY: 'auto',
        }}
      >
        {messageList.length ? (
          messageList.map((item) => {
            const isOwnItem = item.user!._id === userData._id;
            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isOwnItem ? 'flex-end' : 'flex-start',
                  mt: '1.4rem',
                  ml: isOwnItem ? 'auto' : '0',
                  maxWidth: '90%',
                }}
                key={item._id}
              >
                <Avatar
                  alt="User avatar"
                  src={isOwnItem ? userData.profileImg : item.user!.profileImg}
                  sx={{
                    order: isOwnItem ? 2 : 1,
                    m: isOwnItem ? '0 0 0 0.5rem' : '0 0.5rem 0 0',
                  }}
                />
                <Typography
                  sx={
                    isOwnItem
                      ? {
                          ...msgStyle,
                          border: `2px solid ${companyData.themeColors.primary}`,
                          order: isOwnItem ? 1 : 2,
                        }
                      : {
                          ...msgStyle,
                          border: `2px solid ${'#ddd'}`,
                          order: isOwnItem ? 1 : 2,
                        }
                  }
                >
                  {item.message}
                  <Typography
                    component={'span'}
                    sx={{
                      fontSize: '0.6rem',
                      color: '#535353',
                      display: 'block',
                      mt: '0.5rem',
                    }}
                  >
                    {formatDatetime(new Date(item.createdAt))}
                  </Typography>
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              mt: '2rem',
            }}
          >
            Start conversation with admin regarding this claim.
          </Typography>
        )}
      </Box>

      <div
        style={{
          width: '100%',
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          maxRows={2}
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            width: '80%',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: `${companyData.themeColors.primary}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: `${companyData.themeColors.primary}`,
                borderWidth: 2,
              },
            },
          }}
        />
        <button
          style={{
            backgroundColor: `${companyData.themeColors.primary}`,
            color: `${companyData.themeColors.secondary}`,
            cursor: 'pointer',
            padding: '0.9rem 0.5rem',
            border: 'none',
            borderRadius: '5px',
            marginLeft: '5px',
          }}
          type="submit"
          onClick={handleSubmitClick}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </Box>
  );
};

export default ClaimChat;
