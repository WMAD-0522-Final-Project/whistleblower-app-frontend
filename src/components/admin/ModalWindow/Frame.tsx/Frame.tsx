import { Box } from '@mui/material';
import * as React from 'react';
import { Component } from 'react';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import styles from './Frame.module.scss';
import { Claim } from '../../../../types';
import ClaimChat from '../../../ClaimChat';

type Props = {
  width: number;
  height: number;
  label: string;
  text?: string;
  component?: JSX.Element[];
  claim?: Partial<Claim>;
};
function Frame({ width, height, label, text, component, claim }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  console.log(component, ';lk');
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
          backgroundColor: companyData.themeColors.secondary,

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

        <div
          className={styles.contentBox}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: label !== 'chat' ? 'scroll' : 'initial',
            overflowX: 'hidden',
            top: '-10%',
            // border: 'solid 3px black',
            // backgroundColor: 'red',
          }}
        >
          {claim && (
            <div>
              <div>{claim.submissionDate}</div>
              <div>{claim.category}</div>
              <div>{claim.message}</div>
            </div>
          )}
          {label !== 'chat'
            ? component?.map((user, i) => {
                return (
                  <>
                    <div
                      style={{
                        width: '70%',
                        height: '30%',
                        // border: 'solid 2px black',
                        position: 'absolute',
                        marginTop: `${50 * i}%`,
                      }}
                    >
                      {user}
                    </div>
                  </>
                );
              })
            : component?.map((user, i) => {
                return <>{user}</>;
              })}
          {/* {component &&
            component.map((user, i) => {
              return (
                <>
                  <div
                    style={{
                      width: '70%',
                      height: '30%',
                      // border: 'solid 2px black',
                      position: 'absolute',
                      marginTop: `${50 * i}%`,
                    }}
                  >
                    {user}
                  </div>
                </>
              );
            })} */}
        </div>
      </Box>
    </>
  );
}

export default Frame;
