import * as React from 'react';
import { Component } from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimListAdmin from '../ClaimListAdmin';
import { Claim } from '../../../types';
// import styles from './ClaimBox.module.scss';
import styles from './ClaimBox.module.scss';

import { StrictModeDroppable as Droppable } from '../../../helpers/StrictModeDroppable';
type Props = {
  width: number;
  height: number;
  label: string;
  claims: Partial<Claim>[];
};
function ClaimBox({ width, height, label, claims }: Props) {
  // const { companyData } = useSelector(selectCompanyData);
  const { companyData } = useSelector(selectCompanyData);

  return (
    <>
      <Box
        sx={{
          width: `${width}%`,
          height: `${height}%`,
          color: 'black',
          borderRadius: '20px',
          posiition: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: companyData.themeColors.secondary,
        }}
      >
        <Box
          sx={{
            borderRadius: '20px',
            color: companyData.themeColors.secondary,
            backgroundColor: companyData.themeColors.primary,
            padding: '5%',
          }}
        >
          {label}
        </Box>
        <Droppable droppableId={label}>
          {(provided) => (
            <div
              className={styles.claimBox}
              style={{
                width: '90%',
                height: '80%',
                // border: 'solid 3px black',
                overflow: 'scroll',
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <ClaimListAdmin claims={claims}></ClaimListAdmin>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </>
  );
}

export default ClaimBox;
