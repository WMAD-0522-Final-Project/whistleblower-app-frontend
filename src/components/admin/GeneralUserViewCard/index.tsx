import * as React from 'react';
import { Component, useEffect } from 'react';
import { Badge, Box, SxProps, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import Yeallowtable from '../../SVG/YeallowTable';

import { Claim } from '../../../types';
import { motion } from 'framer-motion';
import EditIcon from '../../SVG/EditIcon';
import { adminUser } from '../../../types/index';
import styles from './GeneralUserViewCard.module.scss';
import { useAllContext } from '../../../context/ClaimIdContext';
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
    const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const smallmatches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    const middlematches = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const editHandle = () => {
      if (user)
        setContext((context) => ({
          ...context,
          GeneralUserId: user._id,
        }));
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
            flexDirection: smallmatches ? 'row' : 'column',
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
          <div></div>
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div style={{ fontSize: middlematches ? '0.9rem' : '0.6rem' }}>
            <div>email : {user.email}</div>
            <div>department : {user.department?.name}</div>
          </div>
          {smallmatches && (
            <div
              onClick={editHandle}
              style={{
                width: '8%',
                height: '90%',
                position: 'relative',
                right: '3%',
                // display: !middlematches && 'none',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <EditIcon
                animate={
                  context.GeneralUserId === user._id ? { rotate: 90 } : {}
                }
                transition={{ duration: 0.5 }}
              ></EditIcon>
            </div>
          )}
          {!smallmatches && (
            <div
              onClick={editHandle}
              style={{
                width: '15%',
                height: '15%',
                position: 'absolute',
                right: '5%',
                top: '20%',
              }}
            >
              <EditIcon
                animate={
                  context.GeneralUserId === user._id ? { rotate: 90 } : {}
                }
                transition={{ duration: 0.5 }}
              ></EditIcon>
            </div>
          )}
        </Box>
      </>
    );
  }
);
export default motion(GeneralUserViewCard);
