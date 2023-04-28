import React, { ReactNode } from 'react';
import { Box, SxProps, Tab, Tabs } from '@mui/material';
import TabPanel from './TabPanelCustom';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import useLetterColor from '../../hooks/useLetterColor';
const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

interface Props {
  options: string[];
  contents: ReactNode[];
  sx?: SxProps;
  currentState: (e: number) => void;
}
const TabsCustom = ({ options, contents, sx, currentState }: Props) => {
  const [value, setValue] = React.useState(0);
  const { companyData } = useSelector(selectCompanyData);
  const { letterColor } = useLetterColor();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    currentState(value);
  }, [value]);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              bgcolor: companyData.themeColors.secondary,
            },
          }}
        >
          {options.map((option, index) => (
            <Tab
              label={option}
              {...a11yProps(index)}
              sx={{
                color: letterColor,
                '&.Mui-selected': {
                  bgcolor: '#fff',
                  borderRadius: '5px',
                  color: companyData.themeColors.primary,
                },
              }}
              key={option}
            />
          ))}
        </Tabs>
      </Box>
      {contents.map((content, index) => (
        <TabPanel value={value} index={index} key={index} sx={{ mt: '2rem' }}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabsCustom;
