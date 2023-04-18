import React, {
  FormEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import ButtonComponent from '../MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Chat } from '../../types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  chatData: Chat[] | undefined;
};

const ClaimChat = ({ chatData }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [messageList, setMessageList] = useState(chatData || []);
  const [content, setContent] = useState('');
  const scrollRef = useRef<HTMLElement>(null);

  const msgStyle = {
    borderRadius: '30px',
    fontSize: '0.9rem',
    p: '0.5rem 2rem',
  };
  // TODO: temporary data
  const user = {
    id: 'poiuytresdfgh',
    avatarUrl: '/images/profileImg.jpg',
  };

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();
    if (!content) return;
    // TODO: send request to API
    setMessageList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        datetime: format(new Date(), 'yyyy/MM/dd hh:mm'),
        user: {
          id: 'poiuytresdfgh',
          avatarUrl: user.avatarUrl,
        },
        content,
      },
    ]);
    setContent('');
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
          overflowY: 'auto',
        }}
      >
        {messageList.map((item) => {
          const isOwnItem = item.user.id === user.id;
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
              key={item.id}
            >
              <Avatar
                alt="User avatar"
                src={isOwnItem ? user.avatarUrl : item.user.avatarUrl}
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
                {item.content}
                <Typography
                  component={'span'}
                  sx={{
                    fontSize: '0.6rem',
                    color: '#535353',
                    display: 'block',
                    mt: '0.5rem',
                  }}
                >
                  {item.datetime}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
