import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../../RTK/companySlice';
import Yeallowtable from '../../../SVG/YeallowTable';
import { Claim } from '../../../../types';
import { motion } from 'framer-motion';
import EditIcon from '../../../SVG/EditIcon';

type Props = {
  name: string;
  width: number;
  height: number;
  url: string;
  edit: boolean;
  sx?: SxProps;
};
const UserCard = React.forwardRef(
  ({ name, width, height, url, edit, sx }: Props, ref) => {
    const { companyData } = useSelector(selectCompanyData);
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
            justifyContent: 'space-between',
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
              position: 'absolute',
              width: '50%',
              height: '120%',
              // backgroundColor: 'red',
              left: '-20%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Yeallowtable
              width={width}
              height={height}
              url={url}
            ></Yeallowtable>
          </div>

          <Typography
            fontSize={'1.5vh'}
            sx={{
              width: '90%',
              overflow: 'hidden',
              pt: '0.2rem',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            {name}
          </Typography>
          {edit && (
            <Box
              sx={{
                background: companyData.themeColors.tertiary,
                color: 'black',
                padding: '1.5%',
                borderRadius: '20px',
                right: '0%',
                fontSize: '0.7rem',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              change passward
            </Box>
          )}

          {edit && (
            <div
              style={{
                width: '30%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <EditIcon></EditIcon>
            </div>
          )}
        </Box>
      </>
    );
  }
);
// export const MotionUserCard = motion(UserCard);

// export default motion(UserCard);
export default motion(UserCard);
