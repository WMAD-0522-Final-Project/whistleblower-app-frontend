import React, { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import SearchIcon from '@mui/icons-material/Search';
import { Box, SxProps } from '@mui/material';
import styles from './styles.module.scss';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  sx: SxProps;
};

const SearchBox = ({ onChange, sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  return (
    <Box
      className={styles.searchBox}
      style={{ backgroundColor: companyData.themeColors.tertiary }}
      sx={{ ...sx }}
    >
      <SearchIcon
        sx={{ color: companyData.themeColors.primary, fontSize: '2.2rem' }}
      />
      <input
        onChange={onChange}
        placeholder="Search.."
        style={{
          backgroundColor: companyData.themeColors.primary,
          color: companyData.themeColors.secondary,
        }}
      />
    </Box>
  );
};

export default SearchBox;
