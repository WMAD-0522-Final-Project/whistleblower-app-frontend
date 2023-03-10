import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';

const App = () => {
  // use Redux for loading state
  // const isLoading = true;
  const isLoading = useSelector(selectLoading);
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));
  console.log(isLoading);

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
    </Box>
  );
};

export default App;
