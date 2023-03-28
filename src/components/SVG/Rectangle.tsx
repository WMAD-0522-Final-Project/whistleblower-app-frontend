import * as React from 'react';
import { Component } from 'react';
const Reactangle = () => {
  return (
    <div
      style={{
        width: '150px',
        height: '100%',
        position: 'absolute',
        right: '0%',
        top: '-1%',
      }}
    >
      <svg
        width="158px"
        height="130%"
        viewBox="0 0 130 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Rectangle 73" filter="url(#filter0_d_404_13931)">
          <path
            d="M4 0H43.0764H68.4761H105.137C116.183 0 125.137 8.95431 125.137 20V39.9746C125.137 55.8543 107.521 65.4006 94.2168 56.7302L73.3857 43.154C70.18 41.0648 67.641 38.0998 66.0697 34.6109L58.5904 18.0031C57.3806 15.3165 55.592 12.9305 53.3528 11.0156L46.0843 4.79993C42.4619 1.7022 37.8522 0 33.0859 0H4Z"
            fill="#FFCB14"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_404_13931"
            x="0"
            y="0"
            width="100%"
            height="100%"
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
              result="effect1_dropShadow_404_13931"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_404_13931"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Reactangle;