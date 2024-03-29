import * as React from 'react';
import { Component } from 'react';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
function Closebutton() {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <svg
        width="3rem"
        height="3rem"
        viewBox="0 0 60 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_896_14936)">
          <ellipse
            cx="30"
            cy="26.5"
            rx="26"
            ry="26.5"
            fill={companyData.themeColors.primary}
          />
          <path
            d="M16.1392 12.1867C16.5264 11.7838 17.0515 11.5574 17.5989 11.5574C18.1464 11.5574 18.6715 11.7838 19.0587 12.1867L29.9872 23.564L40.9157 12.1867C41.1062 11.9814 41.334 11.8177 41.5859 11.705C41.8378 11.5924 42.1088 11.5331 42.3829 11.5306C42.6571 11.5281 42.9289 11.5825 43.1827 11.6906C43.4364 11.7987 43.667 11.9583 43.8608 12.1601C44.0547 12.3619 44.208 12.6019 44.3118 12.8661C44.4156 13.1302 44.4679 13.4133 44.4655 13.6987C44.4631 13.9841 44.4062 14.2662 44.2979 14.5284C44.1897 14.7906 44.0324 15.0278 43.8352 15.2261L32.9067 26.6034L43.8352 37.9807C44.2113 38.3861 44.4195 38.929 44.4148 39.4926C44.41 40.0562 44.1929 40.5953 43.8101 40.9939C43.4273 41.3924 42.9094 41.6185 42.3681 41.6233C41.8267 41.6282 41.3051 41.4116 40.9157 41.02L29.9872 29.6428L19.0587 41.02C18.6693 41.4116 18.1477 41.6282 17.6064 41.6233C17.065 41.6185 16.5472 41.3924 16.1643 40.9939C15.7815 40.5953 15.5644 40.0562 15.5597 39.4926C15.555 38.929 15.7631 38.3861 16.1392 37.9807L27.0677 26.6034L16.1392 15.2261C15.7521 14.823 15.5347 14.2764 15.5347 13.7064C15.5347 13.1365 15.7521 12.5898 16.1392 12.1867Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_896_14936"
            x="0"
            y="0"
            width="60"
            height="61"
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
              result="effect1_dropShadow_896_14936"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_896_14936"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default Closebutton;
