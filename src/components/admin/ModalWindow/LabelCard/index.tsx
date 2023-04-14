import * as React from 'react';
import { Component } from 'react';
import { Box } from '@mui/material';
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
};
function LabelCard({ name, width, height, url, color }: Props) {
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
            right: '0%',
          }}
        >
          <ClaimLabel color={stc(name)}></ClaimLabel>
        </div>
      </Box>
    </>
  );
}

export default LabelCard;
