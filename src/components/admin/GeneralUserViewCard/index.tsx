import * as React from 'react';
import { Component, useEffect } from 'react';
import {
  Badge,
  Box,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import Yeallowtable from '../../SVG/YeallowTable';
import useLetterColor from '../../../hooks/useLetterColor';
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
    const { letterColor } = useLetterColor();

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const smallmatches = useMediaQuery((theme: Theme) =>
      theme.breakpoints.up('sm')
    );
    const semilargematches = useMediaQuery((theme: Theme) =>
      theme.breakpoints.between(770, 1300)
    );
    const middlematches = useMediaQuery((theme: Theme) =>
      theme.breakpoints.up('md')
    );

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
            color: letterColor,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: semilargematches
              ? 'column'
              : smallmatches
              ? 'row'
              : 'column',
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
          <div
            style={{
              fontSize: semilargematches
                ? '0.6rem'
                : middlematches
                ? '0.9rem'
                : '0.6rem',
            }}
          >
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
              // display: !middlematches && 'none',

              display: semilargematches
                ? 'none'
                : smallmatches
                ? 'flex'
                : 'none',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EditIcon
              animate={context.GeneralUserId === user._id ? { rotate: 90 } : {}}
              transition={{ duration: 0.5 }}
            ></EditIcon>
          </div>

          <div
            onClick={editHandle}
            style={{
              width: '40px',
              height: '40px',
              position: 'absolute',
              right: '5%',
              top: '20%',
              display: semilargematches
                ? 'block'
                : smallmatches
                ? 'none'
                : 'block',
            }}
          >
            <EditIcon
              animate={context.GeneralUserId === user._id ? { rotate: 90 } : {}}
              transition={{ duration: 0.5 }}
            ></EditIcon>
          </div>
        </Box>
      </>
    );
  }
);
export default motion(GeneralUserViewCard);
