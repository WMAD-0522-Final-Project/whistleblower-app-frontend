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

type Props = {
  chatData: Chat[] | undefined;
};

const ClaimChat = ({ chatData }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [messageList, setMessageList] = useState(chatData || []);
  const [content, setContent] = useState('');
  const scrollRef = useRef<HTMLElement>(null);

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
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <Box
        ref={scrollRef}
        sx={{
          height: '70%',
          overflowY: 'scroll',
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
                sx={{
                  borderRadius: '16px',
                  border: `2px solid ${
                    isOwnItem
                      ? companyData.themeColors.primary
                      : companyData.themeColors.secondary !== '#fff'
                      ? companyData.themeColors.secondary
                      : '#ddd'
                  }`,
                  fontSize: '0.9rem',
                  order: isOwnItem ? 1 : 2,
                  p: '0.5rem 0.8rem',
                }}
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
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          bottom: '3%',
          height: '25%',
          translate: '-50% 0',
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={3}
          placeholder="Enter message"
          name="message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            background: '#fff',
            border: `2px solid ${companyData.themeColors.primary}`,
            borderRadius: '5px',
            outline: 'none',
            width: '100%',
          }}
        />
        <ButtonComponent
          customColor={companyData.themeColors.primary}
          sx={{
            color: companyData.themeColors.secondary,
            display: 'block',
            width: '100%',
            margin: '0 auto',
            maxWidth: '400px',
            p: '0.6rem 0',
            mt: '1.4rem',
          }}
          type="submit"
          onClick={handleSubmitClick}
        >
          Submit
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default ClaimChat;
