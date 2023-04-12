import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
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
          color: companyData.themeColors.primary,
          display: 'flex',
          width: `${width}%`,
          height: `${height}px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            left: '-10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
            right: '0%',
          }}
        >
          <ClaimLabel color={color}></ClaimLabel>
        </div>
      </Box>
    </>
  );
}

export default LabalCard;
