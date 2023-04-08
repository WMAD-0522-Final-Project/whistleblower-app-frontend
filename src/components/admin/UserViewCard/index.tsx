import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import Yeallowtable from '../../SVG/YeallowTable';

import { Claim } from '../../../types';
import { motion } from 'framer-motion';
import EditIcon from '../../SVG/EditIcon';
import { adminUser } from '../../../types/index';
import styles from './UserViewCard.module.scss';

import {
  ClaimIdContext,
  useClaimContext,
} from '../../../custom/ClaimIdContext';
type Props = {
  user: Partial<adminUser>;
  width: number;
  height: number;
  url: string;
  edit: boolean;
  sx?: SxProps;
};
const UserViewCard = React.forwardRef(
  ({ user, width, height, url, edit, sx }: Props, ref) => {
    const { companyData } = useSelector(selectCompanyData);
    const { claimId, setClaimId } = useClaimContext();
    const editHandle = () => {
      if (user.firstName) setClaimId(user.firstName);
    };
    return (
      <>
        <Box
          component="li"
          ref={ref}
          sx={{
            backgroundColor: companyData.themeColors.primary,
            borderRadius: '2rem',
            boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
            color: companyData.themeColors.secondary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            minHeight: '16px',
            padding: '0.5rem 0.5rem 0.5rem 1rem',
            position: 'relative',
            width: `${width}%`,
            height: `${height}px`,
            ...sx,
            // marginTop: '100px',
          }}
          // style={{ backgroundColor: 'white' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div style={{ fontSize: '1.1rem' }}>
              {user.firstName} {user.lastName}
            </div>
            <div style={{}}>
              <div style={{ fontSize: '0.8rem' }}>email : {user.email}</div>
              <div style={{ fontSize: '0.8rem' }}>department : accountance</div>
            </div>
          </div>
          <div
            className={styles.permmisions}
            style={{
              width: '30%',
              height: '95%',
              border: '2px solid white',
              borderRadius: '20px',
              overflow: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              fontSize: '0.7rem',
            }}
          >
            {user.permissions?.map((per, i) => {
              return (
                <>
                  <div
                    style={{
                      backgroundColor: companyData.themeColors.tertiary,
                      color: 'black',
                      padding: '0.1rem',
                      width: '80%',
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: '10px',
                      fontSize: '0.6rem',
                    }}
                  >
                    {per.name}
                  </div>
                </>
              );
            })}
          </div>
          <div onClick={editHandle}>
            <EditIcon
              animate={claimId === user.firstName ? { rotate: 100 } : {}}
              transition={{ duration: 1 }}
            ></EditIcon>
          </div>
        </Box>
      </>
    );
  }
);
// export const MotionUserCard = motion(UserCard);

// export default motion(UserCard);
export default motion(UserViewCard);
