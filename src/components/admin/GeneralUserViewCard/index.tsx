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
import styles from './GeneralUserViewCard.module.scss';
import { useAllContext } from '../../../custom/ClaimIdContext';
import YellowTablePassword from '../../SVG/YellowTablePassword';
type Props = {
  user: Partial<adminUser>;
  width: number;
  height: number;
  url: string;
  edit: boolean;
  sx?: SxProps;
};
const GeneralUserViewCard = React.forwardRef(
  ({ user, width, height, url, edit, sx }: Props, ref) => {
    const { companyData } = useSelector(selectCompanyData);
    const { context, setContext } = useAllContext();
    const editHandle = () => {
      // if (user.firstName) setClaimId(user.firstName);
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
          }}
        >
          <div style={{ top: '30px', left: '10px', position: 'absolute' }}>
            <Yeallowtable url={url}></Yeallowtable>
          </div>
          {/* <div
            style={{ position: 'absolute', right: '-12px', bottom: '-10px' }}
          >
            <YellowTablePassword></YellowTablePassword>
          </div> */}
          <div></div>
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            <div>email : {user.email}</div>
            <div>department : {user.department?.name}</div>
          </div>
          <div
            onClick={editHandle}
            style={{
              width: '8%',
              height: '90%',
              position: 'relative',
              right: '3%',
            }}
          >
            <EditIcon
              animate={claimId === user.firstName ? { rotate: 90 } : {}}
              transition={{ duration: 0.5 }}
            ></EditIcon>
          </div>
        </Box>
      </>
    );
  }
);
export default motion(GeneralUserViewCard);
