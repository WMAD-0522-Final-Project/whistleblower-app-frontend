import React, { FormEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import ButtonComponent from '../MUI_comp/ButtonComponent';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import { Chat } from '../../types';

type Props = {
  chatData: Chat[];
};

const ClaimChat = ({ chatData }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [messageList, setMessageList] = useState(chatData);
  const [content, setContent] = useState('');

  // TODO: temporary data
  const user = {
    id: 'poiuytresdfgh',
    avatarUrl: '/images/profileImg.jpg',
  };

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();
    // TODO: send request to API
    console.log('content', content);
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

  return (
    <Box sx={{ p: '0.8rem' }}>
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
                backgroundColor: isOwnItem ? '#0d99ff5c' : '#ff70005c',
                borderRadius: '16px',
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
          width: '100%',
          mt: '3rem',
          border: `2px solid ${companyData.themeColors.primary}`,
          borderRadius: '5px',
          outline: 'none',
        }}
      />
      <ButtonComponent
        customColor={companyData.themeColors.primary}
        sx={{
          color: companyData.themeColors.secondary,
          width: '100%',
          mt: '1rem',
        }}
        type="submit"
        onClick={handleSubmitClick}
      >
        Submit
      </ButtonComponent>
    </Box>
  );
};

export default ClaimChat;
