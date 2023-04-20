import { useState, ChangeEventHandler, useEffect } from 'react';
import { Button, Typography, useTheme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  sx?: SxProps;
  text: string;
};

const FileInput = ({ onChange, name, sx, text }: Props) => {
  const { companyData } = useSelector(selectCompanyData);
  const theme = useTheme();
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
          // boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
          // color: '#000',
          cursor: 'pointer',
          boxShadow:
            'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
          color: companyData.themeColors.primary,
          textAlign: 'center',
          padding: '2px 10px',
          fontSize: '0.7rem',
          textTransform: 'capitalize',
          ...sx,
        }}
      >
        <AttachFileIcon sx={{ fontSize: '1rem' }} />
        {text}
        <input
          type="file"
          name={name}
          style={{
            cursor: 'pointer',
            fontSize: '0',
            opacity: '0',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          }}
          onChange={handleChange}
          multiple={false}
        />
      </Button>
      <Typography
        sx={{
          fontSize: '0.7rem',
          mt: '0.2rem',
          // color: companyData.themeColors.primary,
          [theme.breakpoints.up('lg')]: {
            fontSize: '0.8rem',
          },
          color: companyData.themeColors.secondary,
        }}
      >
        {file ? file.name : 'No file selected'}
      </Typography>
    </>
  );
};

export default FileInput;
