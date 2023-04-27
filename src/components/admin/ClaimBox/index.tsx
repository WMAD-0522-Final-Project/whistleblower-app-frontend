import * as React from 'react';
import { Component } from 'react';
import { Box, SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import ClaimListAdmin from '../ClaimListAdmin';
import { Claim } from '../../../types';
import styles from './ClaimBox.module.scss';
import { motion } from 'framer-motion';
import { StrictModeDroppable as Droppable } from '../../../helpers/StrictModeDroppable';
type Props = {
  width: number;
  height: number;
  label: string;
  // claims: Partial<Claim>[];
  claims: Claim[];
  id: string;
  sx?: SxProps;
};

const ClaimBox = React.forwardRef(
  ({ width, height, label, claims, id, sx }: Props, ref) =>
    /// <reference path="" />

    {
      const { companyData } = useSelector(selectCompanyData);

      return (
        <>
          <Box
            ref={ref}
            sx={{
              width: `${width}%`,
              height: `${height}%`,
              color: 'black',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: companyData.themeColors.secondary,
              maxWidth: '600px',
            }}
          >
            <Box
              sx={{
                borderRadius: '20px',
                color: companyData.themeColors.secondary,
                backgroundColor: companyData.themeColors.primary,
                padding: '3% 6%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...sx,
              }}
            >
              {label}
            </Box>

            <Droppable droppableId={id}>
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
);

export default motion(ClaimBox);
