import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Login from './pages/Login';

const App = () => {
  // use Redux for loading state
  const isLoading = true;

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  // Juan is making the theme here
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        {/* {isLoading && <CircularProgress />}
      {sampleAlert.message && (
        <Alert
          severity={sampleAlert.type}
          sx={
            {
              // style here
            }
          }
          onClose={() => {
            // reset alert state here
          }}
        >
          <AlertTitle>{sampleAlert.type}</AlertTitle>
          {sampleAlert.message}

        </Alert>
      )} */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
