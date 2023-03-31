import React, { ChangeEventHandler } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { SxProps } from '@mui/material/styles';

type type = {
  label: string;
  boxColor: string;
  boxSize: string;
  labelFontSize: string;
  boxStyle?: SxProps;
  labelStyle?: SxProps;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  sx?: SxProps;
};

const CheckboxLabel = ({
  label,
  name,
  boxColor,
  boxSize,
  labelFontSize,
  boxStyle,
  labelStyle,
  onChange,
  sx,
}: type) => {
  return (
    <FormGroup sx={{ ...sx }}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            defaultChecked
            onChange={onChange}
            sx={{
              '& svg': { color: boxColor },
              '& .MuiSvgIcon-root': { fontSize: boxSize },
              ...boxStyle,
            }}
          />
        }
        label={label}
        sx={{
          '& span': {
            fontSize: labelFontSize,
          },
          ...labelStyle,
        }}
      />
    </FormGroup>
  );
};
export default CheckboxLabel;
