import * as React from 'react';
import { Box, SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import Yeallowtable from '../../SVG/YeallowTable';
import { motion } from 'framer-motion';
import ButtonComponent from '../../MUI_comp/ButtonComponent';
import { InquiryUser } from '../../../types/index';
import checkPermission from '../../../helpers/checkPermission';
import { UserPermissionOption } from '../../../types/enums';
import { selectUserData } from '../../../RTK/userDataSlice';
import commonStyles from '../../../styles/common.module.scss';
import useLetterColor from '../../../hooks/useLetterColor';
type Props = {
  user: InquiryUser;
  url: string | undefined;
  onClick?: () => void;
  sx?: SxProps;
};

const UserInquiryCard = React.forwardRef(
  ({ user, onClick, sx }: Props, ref) => {
    const { companyData } = useSelector(selectCompanyData);
    const { userData } = useSelector(selectUserData);
    const { letterColor } = useLetterColor();

    return (
      <Box
        component="li"
        ref={ref}
        sx={{
          backgroundColor: companyData.themeColors.primary,
          borderRadius: '2rem',
          boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
          color: letterColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0.6rem 0.4rem 0.6rem 2.8rem;',
          position: 'relative',
          width: '90%',
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
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up('md')]: {
              display: 'flex',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              fontSize: '0.8rem',
              [theme.breakpoints.down('md')]: {
                fontSize: '0.9rem',
              },
            })}
          >
            {user.firstName} {user.lastName}
          </Box>
          <Box
            sx={(theme) => ({
              fontSize: '0.8rem',
              [theme.breakpoints.up('md')]: {
                fontSize: '0.9rem',
                ml: '2rem',
              },
            })}
          >
            <div>email : {user.email}</div>
          </Box>
        </Box>
        <ButtonComponent
          customColor={companyData.themeColors.primary}
          type="submit"
          onClick={onClick}
          className={
            !checkPermission(
              UserPermissionOption.USER_MANAGEMENT,
              userData.permissions
            ) && commonStyles.disabled
          }
          sx={{
            background: companyData.themeColors.secondary,
            color: companyData.themeColors.primary,
            fontSize: '0.6rem',
            transition: 'scale 100ms ease-in-out',
            width: '20%',
            ml: '0.6rem',
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
