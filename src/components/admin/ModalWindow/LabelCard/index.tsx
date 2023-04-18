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
        component="li"
        sx={{
          color: companyData.themeColors.primary,
          display: 'flex',
          position: 'relative',
          width: `${width}%`,
          height: `${height}px`,
          position: 'relative',
          ...sx,
        }}
      >
        <div
          style={{
            // position: 'absolute',
            top: '-30%',
            left: '-20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LabelSettingOrange name={name}></LabelSettingOrange>
        </div>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '16%',
            // height: '100%',
            position: 'absolute',
            // right: '0%',
            right: '26px',
            top: '40%',
            translate: '0 -50%',
          }}
        >
          <ClaimLabel color={stc(name)}></ClaimLabel>
        </div>
      </Box>
    </>
  );
}

export default LabelCard;
