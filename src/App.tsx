import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import NavigationMenu from './components/NavigationMenu';
import TestComponent from './components/MUI_comp/TestComponent';

const App = () => {
  // use Redux for loading state
  const isLoading = true;

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  return (
    <>
    <Box>

      <CssBaseline />
    
        
    </Box>
     <TestComponent/>
    </>
    
  );
};

export default App;
