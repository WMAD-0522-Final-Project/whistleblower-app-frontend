import * as React from 'react';
import { Component } from 'react';
import { Claim } from '../../types';
import { Badge, Box, SxProps, Typography } from '@mui/material';

type Props = { claim: Partial<Claim>; sx?: SxProps };
const ClaimYellowTable = ({ claim, sx }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '50px',
        position: 'relative',
        ...sx,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-20px',
          top: '-17px',
          scale: '1',
        }}
      >
        <svg
          width={`160px`}
          height={`100px`}
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
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height: 'auto',
            top: '25px',
            right: '30px',
            translate: '25%',
          }}
        >
          {claim.members?.length &&
            // Show badge with number
            (claim.members!.length > 3 ? (
              <>
                <Box
                  component="img"
                  src={claim.members[0].avatarUrl}
                  alt=""
                  sx={{
                    borderRadius: '50%',
                    // display: 'block',
                    // pl: '0.2rem',
                    // margin: '-18%',
                    width: '40px',
                    height: '70%',
                    zIndex: '1',
                  }}
                />
                <Badge
                  badgeContent={`+${claim.members.length - 1}`}
                  color="error"
                  sx={{
                    bottom: '15px',
                    right: '0',
                  }}
                />
              </>
            ) : (
              // Show all avatars
              claim.members.map((member, index) => (
                <Box
                  component="img"
                  src={member.avatarUrl}
                  alt={`${index}`}
                  sx={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '70%',
                    zIndex: index + 1,
                    ml: '-15px',
                  }}
                  key={member.userId}
                />
              ))
            ))}
        </Box>
      </div>
    </Box>
  );
};

export default ClaimYellowTable;
