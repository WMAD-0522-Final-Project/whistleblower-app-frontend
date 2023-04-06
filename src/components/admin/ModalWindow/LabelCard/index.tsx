import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import stc from 'string-to-color';
import { selectCompanyData } from '../../../../RTK/companySlice';
import Yeallowtable from '../../../SVG/YeallowTable';
import { Claim } from '../../../../types';
import Garbege from '../../../SVG/Garbege';
import LabelSttingOrange from '../../../SVG/LabelSttingOrange';
import ClaimLabel from '../../../SVG/ClaimLabel';
type Props = {
  name: string;
  width: number;
  height: number;
  url: string;
  color: string;
};
function LabalCard({ name, width, height, url, color }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <Box
        component="li"
        sx={{
          backgroundColor: companyData.themeColors.secondary,
          borderRadius: '2rem',
          border: `5px solid ${companyData.themeColors.primary}`,
          boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
          color: companyData.themeColors.primary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.5rem 0.5rem 1rem',
          position: 'relative',
          width: `${width}%`,
          height: `${height}px`,
          // marginTop: '100px',
          // marginLeft: '200px', //delete later
        }}
      >
        <div
          style={{
            width: '90%',
            height: '130%',
            position: 'absolute',
            top: '-30%',
            left: '-10%',
            zIndex: '4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <LabelSttingOrange
            width={width}
            height={height}
            name={name}
          ></LabelSttingOrange>
        </div>
        <div
          style={{
            width: '30%',
            height: '100%',
            position: 'absolute',
            // top: '-30%',
            right: '0%',
            // backgroundColor: 'red',
          }}
        >
          <ClaimLabel color={stc(name)}></ClaimLabel>
        </div>
      </Box>
    </>
  );
}

export default LabalCard;
