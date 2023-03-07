import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
// import ButtonComponent from './components/MUI_comp/ButtonComponent';
import ButtonComponent from './components/MUI_comp/ButtonComponent';

const App = () => {
  // use Redux for loading state
  const isLoading = true;

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  return (
    <Box>
      <CssBaseline />
      {isLoading && <CircularProgress />}
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
        
      )}

      <ButtonComponent width='100px' height='50px' customColor='#f96a02' variant="contained">submit</ButtonComponent>
    </Box>
  );
};

export default App;
