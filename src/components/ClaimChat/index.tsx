import React, {
  FormEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Chat } from '../../types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectUserData } from '../../RTK/userDataSlice';

type Props = {
  claimId: string;
  chatData: Chat[] | undefined;
};

const ClaimChat = ({ claimId, chatData }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const { userData } = useSelector(selectUserData);
  const [messageList, setMessageList] = useState<Chat[]>(chatData || []);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLElement>(null);

  const msgStyle = {
    borderRadius: '30px',
    fontSize: '0.9rem',
    p: '0.5rem 2rem',
  };

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();
    if (!message) return;
    // TODO: send request to API
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
  };

  useLayoutEffect(() => {
    const scroll =
      scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight;
    scrollRef.current!.scrollTo(0, scroll);
  }, [messageList]);

  return (
    <Box sx={{ height: '100%', overflowY: 'hidden', width: '100%' }}>
      <Box
        ref={scrollRef}
        sx={{
          height: '80%',
          overflowY: 'scroll',
        }}
      >
        {messageList.map((item) => {
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
                  {format(new Date(item.createdAt), 'yyyy/MM/dd HH:mm')}
                </Typography>
              </Typography>
            </Box>
          );
        })}
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
          name="message"
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
