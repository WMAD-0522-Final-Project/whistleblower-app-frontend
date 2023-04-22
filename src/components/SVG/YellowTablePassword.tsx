import * as React from 'react';
import { Component } from 'react';
import PaperPlane from './PaperPlane';
function YellowTablePassword() {
  return (
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
      <svg
        width="51"
        height="44"
        viewBox="0 0 51 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1905_16088)">
          <path
            d="M42.5936 26.2199C34.3831 34.6581 16.0397 40.0005 8.55724 30.9105V30.9105C-8.73712 9.90074 29.9338 -5.96616 35.4178 2.98552C40.9018 11.9372 49.7577 14.5641 44.3192 23.9577C43.8393 24.7866 43.2569 25.5383 42.5936 26.2199Z"
            fill="#FFCB14"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1905_16088"
            x="0.137695"
            y="0.434082"
            width="49.8838"
            height="43.2134"
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
              result="effect1_dropShadow_1905_16088"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1905_16088"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'absolute' }}>
        <PaperPlane></PaperPlane>
      </div>
    </div>
  );
}

export default YellowTablePassword;
