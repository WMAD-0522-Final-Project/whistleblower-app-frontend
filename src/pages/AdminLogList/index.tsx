import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import { Box } from '@mui/material';
import { InquiryUser, Log } from '../../types';
import LogCard from '../../components/admin/LogCard';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import SectionTitle from '../../components/SectionTitle';

interface InquiryListData {
  logs: Log[];
}

const AdminLogList = () => {
  const [text, setText] = useState('');
  useState<InquiryUser | null>(null);

  const getLogList = async () => {
    const res: AxiosResponse<InquiryListData> = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/log/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });
    return res.data;
  };

  const { data: logListData } = useQuery({
    queryKey: ['logs'],
    queryFn: getLogList,
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  return (
    <Box sx={{ mt: '1rem' }}>
      <SectionTitle title="Log List" />
      <CustomBox sx={{ height: '90%', width: '100%', maxWidth: '800px' }}>
        <SearchBox
          onChange={(e) => setText(e.target.value)}
          sx={{ width: 300, margin: '0 auto' }}
        ></SearchBox>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '400px',
            overflowY: 'auto',
            marginTop: '3%',
          }}
        >
          {logListData &&
            logListData.logs
              .filter((log) =>
                text != ''
                  ? log.content.toLowerCase().includes(text.toLowerCase())
                  : log
              )
              .map((log) => (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: '1.5rem',
                  }}
                  key={log._id}
                >
                  <LogCard whileHover={{ x: 20 }} log={log} sx={{}}></LogCard>
                </Box>
              ))}
        </Box>
      </CustomBox>
    </Box>
  );
};

export default AdminLogList;
