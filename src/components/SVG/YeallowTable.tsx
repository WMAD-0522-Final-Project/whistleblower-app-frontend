import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';

type Props = {
  url: string;
};
function Yeallowtable({ url }: Props) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute' }}>
          <svg
            width="75"
            height="71"
            viewBox="0 0 75 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_1755_16075)">
              <path
                d="M7.15851 16.543C8.68429 11.9226 12.4123 8.51853 17.0126 6.93291C29.4456 2.64744 54.4892 -4.59998 60.7186 4.05364C69.0961 15.6912 73.8882 54.7404 69.0961 54.7404C64.3041 54.7405 23.2975 73.3244 9.93768 54.7404C0.841371 42.0871 4.13192 25.7083 7.15851 16.543Z"
                fill="#FFCB14"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1755_16075"
                x="0"
                y="0"
                width="75"
                height="71"
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
                  result="effect1_dropShadow_1755_16075"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1755_16075"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <Box
          component="img"
          src={url}
          alt=""
          sx={{
            borderRadius: '50%',
            // display: 'flex',
            // position: 'absolute',
            width: '50px',
            height: '50px',
            top: '0px',
            // left: '0%',
            // backgroundColor: 'red',
            // justifyContent: 'center',
            // alignItems: 'center',
            // // top: '0',
            // // minWidth: '40px',
            // // maxWidth: '60px',
            // // backgroundColor: 'red',
            position: 'absolute',
          }}
        ></Box>
      </div>
    </>
  );
}

export default Yeallowtable;
