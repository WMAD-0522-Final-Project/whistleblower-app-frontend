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
        {claim.members?.length &&
          (claim.members!.length > 3 || claim.members!.length === 0 ? (
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
          ) : claim.members!.length > 2 ? (
            <svg
              width="199"
              height="93"
              viewBox="0 0 190 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Rectangle 102" filter="url(#filter0_d_1730_15941)">
                <path
                  d="M4 0H62.7097H100.871H166C177.046 0 186 8.95431 186 20V44.4147C186 56.0604 176.089 65.2433 164.477 64.3566L106.531 59.9322C102.831 59.6496 99.2819 58.343 96.2817 56.1585L86.1058 48.7492C84.513 47.5894 83.1003 46.2006 81.9134 44.6278L73.8669 33.9643C72.8824 32.6597 72.0616 31.2393 71.4227 29.7349L63.9691 12.1826C60.8325 4.79634 53.5848 0 45.5602 0H4Z"
                  fill="#FFCB14"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1730_15941"
                  x="0"
                  y="0"
                  width="190"
                  height="72.4158"
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
                    result="effect1_dropShadow_1730_15941"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1730_15941"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          ) : (
            claim.members!.length > 1 && (
              <svg
                width="163"
                height="94"
                viewBox="0 0 153 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Rectangle 102" filter="url(#filter0_d_1730_15941)">
                  <path
                    d="M4 0H50.7742H81.1774H129C140.046 0 149 8.95431 149 20V43.9916C149 55.7912 138.838 65.0261 127.092 63.9004L87.8292 60.1375C83.512 59.7237 79.4462 57.9178 76.2448 54.992L69.6487 48.9637C68.2237 47.6614 66.9948 46.1597 66.0002 44.5053L59.5946 33.8503C58.8552 32.6203 58.2503 31.3144 57.7904 29.955L52.2539 13.5904C49.5056 5.46713 41.8844 0 33.3088 0H4Z"
                    fill="#FFCB14"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1730_15941"
                    x="0"
                    y="0"
                    width="153"
                    height="71.9934"
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
                      result="effect1_dropShadow_1730_15941"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1730_15941"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            )
          ))}

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
