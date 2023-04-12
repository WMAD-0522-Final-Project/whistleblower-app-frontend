import * as React from 'react';
import { Component } from 'react';
import { Box, SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import stc from 'string-to-color';
import { selectCompanyData } from '../../../../RTK/companySlice';
import LabelSettingOrange from '../../../SVG/LabelSettingOrange';
import ClaimLabel from '../../../SVG/ClaimLabel';
type Props = {
  name: string;
  width: number;
  height: number;
  url: string;
  color: string;
  sx?: SxProps;
};
function LabelCard({ name, width, height, url, color, sx }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <Box
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
          ...sx,
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
          <LabelSettingOrange
            width={width}
            height={height}
            name={name}
          ></LabelSettingOrange>
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

export default LabelCard;
