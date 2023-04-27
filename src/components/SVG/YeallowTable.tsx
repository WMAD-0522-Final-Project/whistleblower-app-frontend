import * as React from 'react';
import { Avatar, useMediaQuery } from '@mui/material';
import { Component } from 'react';

type Props = {
  url: string | undefined;
  initials?: string;
};

function Yeallowtable({ url, initials }: Props) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

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
            // width="75"
            // height="71"
            widths={matches ? '75' : '55'}
            height={matches ? '71' : '51'}
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
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
        <Avatar
          alt={initials}
          src={url}
          sx={{
            backgroundColor: '#848484',
            fontSize: '0.9rem',
            letterSpacing: '0',
            width: matches ? '48px' : '30px',
            height: matches ? '48px' : '30px',
            position: 'absolute',
            top: '45%',
            left: '50%',
            translate: '-50% -55%',
          }}
        >
          {initials}
        </Avatar>
      </div>
    </>
  );
}

export default Yeallowtable;
