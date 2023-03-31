import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { Component } from 'react';
import Garbege from './Garbege';
type Props = {
  width: number;
  height: number;
  name: string;
};
function LabelSttingOrange({ width, height, name }: Props) {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 174 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_770_16762)">
          <path
            d="M166.937 0.241995C156.751 0.226862 19.1808 0.0224837 8.70793 0.00692479C2.82342 -0.00181743 3.53489 11.3006 5.28784 21.206C6.83576 29.9529 14.7591 35.8129 23.6418 35.8261L141.547 36.0013C148.064 36.0109 154.198 32.8645 157.699 27.3678C164.441 16.7839 173.862 0.252283 166.937 0.241995Z"
            fill="#F96A02"
          />
          <path
            d="M166.934 2.24199L8.70496 2.00692C8.03096 2.00592 7.57923 2.25738 7.15604 2.95737C6.6583 3.7807 6.28653 5.13963 6.12693 7.05478C5.81083 10.8478 6.38673 15.9385 7.25724 20.8575C8.61466 28.5278 15.6013 33.8141 23.6448 33.8261L141.55 34.0013C147.428 34.01 152.902 31.1752 156.012 26.2933C159.376 21.012 163.34 14.35 165.604 9.05378C166.76 6.34952 167.352 4.26772 167.363 2.97924C167.367 2.55073 167.304 2.3496 167.274 2.27763C167.221 2.26168 167.117 2.24226 166.934 2.24199ZM167.32 2.29816C167.321 2.29739 167.315 2.29266 167.299 2.28623C167.311 2.2957 167.319 2.29892 167.32 2.29816Z"
            stroke="#F96A02"
            stroke-width="4"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_770_16762"
            x="0.0395508"
            y="0.00683594"
            width="173.324"
            height="43.9944"
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
              result="effect1_dropShadow_770_16762"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_770_16762"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* <div
        style={{
          width: '100px',
          height: '100%',
          position: 'absolute',
          top: '-35%',
          right: '-30%',
          zIndex: '5',
        }}
      >
        <Garbege></Garbege>
      </div> */}
      <Box
        sx={{
          borderRadius: '50%',
          display: 'block',
          position: 'absolute',
          width: '35%',
          height: '70%',
          zIndex: '5',
          color: 'white',
          // backgroundColor: 'red',
        }}
      >
        {name}
      </Box>
      <div
        style={{
          position: 'absolute',
          width: '35%',
          height: '70%',
          // backgroundColor: 'red',
          left: '-10%',
          top: '-10%',
        }}
      >
        <Garbege></Garbege>
      </div>
    </>
  );
}

export default LabelSttingOrange;
