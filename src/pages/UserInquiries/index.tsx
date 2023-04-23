import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import sampleInquiryUserList from '../../temp/sampleInquiryUserList';
import UserInquiryCard from '../../components/admin/UserInquiryCard';
import useModal from '../../hooks/useModal';
import { Box } from '@mui/material';
import { InquiryUser } from '../../types';

interface InquiryListData {
  message: string;
  inquiries: any[];
}
// interface InquiryDetailData {
//   message: string;
//   inquiry: any;
// }

const UserInquiries = () => {
  const [text, setText] = useState('');
  const [currentInquiryUser, setCurrentInquiryUser] =
    useState<InquiryUser | null>(null);
  // const [activeInquiryUser, setActiveInquiryUser] = useState(null);
  const { handleOpen, Modal } = useModal();

  const getInquiryUserList = async () => {
    const res: AxiosResponse<InquiryListData> = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/inquiry-users`,
    });
    return res.data;
  };

  const { data: userListData } = useQuery({
    queryKey: ['inquiry-users'],
    queryFn: getInquiryUserList,
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  /* ========================== ↓ FOR FUTURE LAUNCH ↓ ================================

  const getInquiryList = async () => {
    const res: AxiosResponse<InquiryListData> = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
    });
    return res.data;
  };

  const getInquiryDetail = async () => {
    const res: AxiosResponse<InquiryDetailData> = await axios({
      method: 'GET',
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/api/inquiries/${activeInquiryUserId}`,
    });
    return res.data;
  };

  const { data: inquiryListData } = useQuery({
    queryKey: ['inquiries'],
    queryFn: getInquiryList,
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  const { data: inquiryDetail } = useQuery({
    queryKey: ['inquiry'],
    queryFn: getInquiryDetail,
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  ============================================================================= */

  const handleInquiryCardClick = (userId: string) => {
    const user = sampleInquiryUserList.find((user) => user._id === userId);
    setCurrentInquiryUser(user!);
    handleOpen();

    /* ============= ↓ FOR FUTURE LAUNCH ↓ =====================
    const targetInquiryUser = inquiryListData!.inquiries.find(
      (item) => item.userId === userId
    );
    setActiveInquiryUser(targetInquiryUser);
    ========================================================== */
  };

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '1%',
      }}
    >
      {/* TODO: Use this in future for other inquiries other than password */}
      <Modal>
        <Box>
          <h2>
            Change password for: {currentInquiryUser?.firstName}{' '}
            {currentInquiryUser?.lastName}
          </h2>
          <ul>
            <li>
              New password:
              <input type="text" />
            </li>
            <li>
              Confirm new password:
              <input type="text" />
            </li>
          </ul>
        </Box>
      </Modal>
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
            overflowY: 'scroll',
            marginTop: '3%',
          }}
        >
          {sampleInquiryUserList
            .filter((user) =>
              text != ''
                ? user.firstName.toLowerCase().includes(text.toLowerCase())
                : user
            )
            .map((user) => (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '1.5rem',
                }}
                key={user._id}
              >
                <UserInquiryCard
                  whileHover={{ x: 20 }}
                  user={user}
                  url={undefined}
                  onClick={() => handleInquiryCardClick(user._id)}
                  sx={{}}
                ></UserInquiryCard>
              </Box>
            ))}
        </Box>
      </CustomBox>
    </div>
  );
};

export default UserInquiries;