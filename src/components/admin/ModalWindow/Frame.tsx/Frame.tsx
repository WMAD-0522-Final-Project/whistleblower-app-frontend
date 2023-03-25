import { Box } from '@mui/material';
import * as React from 'react';
import { Component } from 'react';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';

type Props = {
  width: number;
  height: number;
  label: string;
  text?: string;
  component?: JSX.Element[];
};
function Frame({ width, height, label, text, component }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <Box
        sx={{
          width: `${width}%`,
          height: `${height}%`,
          color: 'black',
          border: `${companyData.themeColors.primary} solid 5px`,
          borderRadius: '20px',
          posiition: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //   overflow: 'scroll',
          //   backgroundColor: 'black',
        }}
      >
        <Box
          sx={{
            fontSize: '1.5rem',
            width: `${label.length + 40}%`,
            height: '2.5rem',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: `${companyData.themeColors.primary}`,
            position: 'relative',
            top: '-20px',
          }}
        >
          {label}
        </Box>
        {text && <p style={{ width: '50%', position: 'absolute' }}>{text}</p>}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            // backgroundColor: 'red',
          }}
        >
          {component &&
            component.map((user, i) => {
              return (
                <>
                  <div
                    style={{
                      width: '70%',
                      height: '30%',
                      border: 'solid 2px black',
                    }}
                  >
                    {user}
                  </div>
                </>
              );
            })}
        </div>
      </Box>
    </>
  );
}

export default Frame;
