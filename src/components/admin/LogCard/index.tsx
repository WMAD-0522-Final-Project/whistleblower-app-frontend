import * as React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import { motion } from 'framer-motion';
import { Log } from '../../../types/index';
import formatDatetime from '../../../helpers/formatDatetime';

type Props = {
  log: Log;
  sx?: SxProps;
};

const LogCard = React.forwardRef(({ log, sx }: Props, ref) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box
      component="li"
      ref={ref}
      sx={{
        backgroundColor: companyData.themeColors.primary,
        borderRadius: '2rem',
        boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
        color: companyData.themeColors.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.2rem',
        position: 'relative',
        width: '80%',
        ...sx,
      }}
    >
      <Box sx={{ padding: '0.4rem 1.2rem' }}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: '600' }}>
          {formatDatetime(new Date(log.createdAt))}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: log.content }}
          sx={{
            fontSize: '0.9rem',
            mt: '0.4rem',
          }}
        ></Typography>
      </Box>
    </Box>
  );
});
export default motion(LogCard);
