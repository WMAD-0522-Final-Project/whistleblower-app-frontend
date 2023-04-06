import React, { useState, ChangeEventHandler } from 'react';
import { Button, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  sx?: SxProps;
};

const FileInput = ({ onChange, name, sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const [file, setFile] = useState<File | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files![0]);
    if (onChange) onChange(e);
  };

  return (
    // need styling here
    <>
      <Button
        sx={{
          backgroundColor: companyData.themeColors.secondary,
          borderRadius: '30px',
          boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
          color: companyData.themeColors.primary,
          textAlign: 'center',
          padding: '2px 10px',
          fontSize: '0.7rem',
          textTransform: 'capitalize',
          ...sx,
        }}
      >
        <AttachFileIcon sx={{ fontSize: '1rem' }} />
        Attach File
        <input
          type="file"
          name={name}
          style={{
            opacity: '0',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          }}
          onChange={handleChange}
        />
      </Button>
      <Typography
        sx={{
          fontSize: '0.7rem',
          mt: '0.2rem',
          color: companyData.themeColors.secondary,
        }}
      >
        ({file ? file.name : 'No file selected'})
      </Typography>
    </>
  );
};

export default FileInput;
