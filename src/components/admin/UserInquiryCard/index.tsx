import * as React from 'react';
import { Box, SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import Yeallowtable from '../../SVG/YeallowTable';
import { motion } from 'framer-motion';
import ButtonComponent from '../../MUI_comp/ButtonComponent';
import { InquiryUser } from '../../../types/index';

type Props = {
  user: InquiryUser;
  url: string | undefined;
  onClick?: () => void;
  sx?: SxProps;
};

const UserInquiryCard = React.forwardRef(
  ({ user, onClick, sx }: Props, ref) => {
    const { companyData } = useSelector(selectCompanyData);

    return (
      <Box
        component="li"
        ref={ref}
        sx={{
          backgroundColor: companyData.themeColors.primary,
          borderRadius: '2rem',
          boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
          color: companyData.themeColors.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0.6rem 0.4rem 0.6rem 2.8rem;',
          position: 'relative',
          width: '80%',
          ...sx,
        }}
      >
        <div style={{ top: '30px', left: '10px', position: 'absolute' }}>
          <Yeallowtable
            url={undefined}
            initials={`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(
              0
            )}`}
          ></Yeallowtable>
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          <div>email : {user.email}</div>
        </div>
        <ButtonComponent
          customColor={companyData.themeColors.primary}
          type="submit"
          onClick={onClick}
          sx={{
            background: companyData.themeColors.secondary,
            color: companyData.themeColors.primary,
            fontSize: '0.6rem',
            transition: 'scale 100ms ease-in-out',
            width: '20%',
            '&:hover': {
              backgroundColor: companyData.themeColors.secondary,
              scale: '1.07',
            },
          }}
        >
          Change Password
        </ButtonComponent>
      </Box>
    );
  }
);
export default motion(UserInquiryCard);
