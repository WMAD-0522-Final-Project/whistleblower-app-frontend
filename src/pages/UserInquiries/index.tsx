import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import UserInquiryCard from '../../components/admin/UserInquiryCard';
import useModal from '../../hooks/useModal';
import { Box, Typography } from '@mui/material';
import { InquiryUser, User } from '../../types';
import { inquiryOption } from '../../types/enums';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import PasswordResetModal from '../../components/admin/PasswordResetModal';

interface InquiryListData {
  message: string;
  users: InquiryUser[];
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
  const { handleOpen, Modal, handleClose } = useModal();

  const getInquiryUserList = async () => {
    const res: AxiosResponse<InquiryListData> = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/contacted/list`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
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

  const passwordForgottenUsers = () => {
    return userListData?.users.filter(
      (user) => user.inquiry === inquiryOption.FORGOT_PASSWORD
    );
  };

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
    const user = userListData!.users.find((user) => user._id === userId);
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
        {currentInquiryUser && (
          <PasswordResetModal
            userId={currentInquiryUser._id}
          ></PasswordResetModal>
        )}
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
            overflowY: 'auto',
            marginTop: '3%',
          }}
        >
          {passwordForgottenUsers()?.length ? (
            passwordForgottenUsers()
              ?.filter((user) =>
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
              ))
          ) : (
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              No users found
            </Typography>
          )}
        </Box>
      </CustomBox>
    </div>
  );
};

export default UserInquiries;
