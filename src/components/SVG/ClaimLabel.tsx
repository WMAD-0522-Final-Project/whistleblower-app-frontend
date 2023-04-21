import { SxProps } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { Component } from 'react';
type Props = {
  color: string;
  sx?: SxProps;
};
function ClaimLabel({ color, sx }: Props) {
  return (
    <>
      <Box
        component="svg"
        width="100%"
        height="100%"
        viewBox="0 0 49 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          ...sx,
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4803 26.3491C15.695 27.1845 15.2428 28.9036 16.4703 30.1889C17.6979 31.4741 20.1402 31.8388 21.9255 31.0034C22.8719 30.5606 23.4437 29.8693 23.5892 29.1261C22.1953 29.4579 20.5835 29.0925 19.7044 28.172C18.6603 27.0788 19.0449 25.6166 20.5634 24.906C20.5732 24.9014 20.583 24.8969 20.5929 24.8924C19.0501 23.6505 17.4212 23.0517 17.4803 26.3491Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.1412 21.2475C26.1557 23.9631 33.5147 23.3476 36.578 19.8727C39.6412 16.3978 37.2487 11.3793 31.2342 8.66365C26.2481 6.41232 20.338 6.45038 16.7174 8.50906C17.1565 8.66563 17.5923 8.84081 18.0217 9.03468C22.8557 11.2173 25.0494 14.9435 22.9216 17.3573C20.7937 19.7712 15.15 19.9586 10.316 17.776C9.94362 17.6078 9.58693 17.4306 9.24668 17.2454C7.32258 20.9776 8.23996 24.0315 20.1412 21.2475Z"
          fill={color}
        />
      </Box>
    </>
  );
}

export default ClaimLabel;
