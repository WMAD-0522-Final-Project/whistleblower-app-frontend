import { Box, SxProps, Typography } from '@mui/material';
import * as React from 'react';
import Garbege from './Garbege';
type Props = {
  name: string;
  sx?: SxProps;
};
function LabelSettingOrange({ name }: Props) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '100%',
          position: 'relative',
        }}
      >
        <svg
          width={'100%'}
          height="49"
          viewBox="0 0 177 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_274_13371)">
            <path
              d="M170.515 0C160.102 0 19.4648 0 8.7584 0C2.45632 0 3.57338 14.2057 5.55893 25.8934C7.08295 34.8644 15.1069 41 24.2064 41H144.171C151.06 41 157.484 37.4661 160.889 31.4785C167.778 19.3659 177.672 0 170.515 0Z"
              fill="#F96A02"
            />
            <path
              d="M170.515 2H8.75839C8.15218 2 7.6297 2.24687 7.11259 3.29032C6.54431 4.43707 6.17357 6.25163 6.04811 8.66755C5.79976 13.4499 6.54283 19.7436 7.53069 25.5585C8.87486 33.4709 15.9804 39 24.2064 39H144.171C150.382 39 156.121 35.8172 159.15 30.4898C162.588 24.4452 166.719 16.6859 169.102 10.4802C170.312 7.32933 170.976 4.81278 170.999 3.18642C171.011 2.40632 170.867 2.10381 170.825 2.03733C170.795 2.02647 170.703 2 170.515 2Z"
              stroke="#F96A02"
              stroke-width="4"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_274_13371"
              x="0"
              y="0"
              width="177"
              height="49"
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
                result="effect1_dropShadow_274_13371"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_274_13371"
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
      </div>
    </>
  );
}

export default LabelSettingOrange;
