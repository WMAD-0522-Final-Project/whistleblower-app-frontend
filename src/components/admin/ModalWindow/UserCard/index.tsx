import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../../RTK/companySlice';
import Yeallowtable from '../../../SVG/YeallowTable';
import { Claim } from '../../../../types';

type Props = {
  name: string;
  width: number;
  height: number;
  url: string;
};
function UserCard({ name, width, height, url }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <Box
        component="li"
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
          <Yeallowtable width={width} height={height} url={url}></Yeallowtable>
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
          }}
        >
          {name}
        </Typography>
      </Box>
    </>
  );
}

export default UserCard;
