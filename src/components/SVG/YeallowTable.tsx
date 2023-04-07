import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';

type Props = {
  width: number;
  height: number;
  url: string;
};
function Yeallowtable({ width, height, url }: Props) {
  return (
    <>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 82 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_274_11239)">
          <path
            d="M4 20.8838C4 11.1731 10.9845 2.94082 20.6493 1.99859C30.9772 0.991718 45.6768 -6.08284e-06 63.5128 0C91.1543 9.42703e-06 72.5948 26.2009 62.2473 38.6176C58.7571 42.8058 53.5301 45 48.0782 45H24C12.9543 45 4 36.0457 4 25V20.8838Z"
            fill="#FFCB14"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_274_11239"
            x="0"
            y="0"
            width="82"
            height="53"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_274_11239"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_274_11239"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <Box
        component="img"
        src={url}
        alt=""
        sx={{
          borderRadius: '50%',
          display: 'block',
          position: 'absolute',
          width: '22%',
          height: '70%',
          // top: '0',
          // minWidth: '40px',
          // maxWidth: '60px',
          // backgroundColor: 'red',
        }}
      ></Box>
    </>
  );
}

export default Yeallowtable;
