import React from 'react';
import { SxProps, Typography } from '@mui/material';

type Props = {
  text: string;
  bgColor: string;
  textColor: string;
  sx?: SxProps;
};

const ItemLabel = ({ text, bgColor, textColor, sx }: Props) => {
  return (
    <Typography
      component="span"
      fontSize="0.6rem"
      sx={{
        borderRadius: '30px',
        backgroundColor: bgColor,
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
        color: textColor,
        padding: '0.1rem 0.8rem',
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default ItemLabel;
