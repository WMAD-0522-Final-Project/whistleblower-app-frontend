import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
import TestComponent from './components/MUI_comp/TestComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';
import AdminHome from './pages/AdminHome';
import NavigationMenu from './components/NavigationMenu';

// TODO: get user data from store
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  profileImg: '/images/profileImg.jpg',
};

const App = () => {
  const { isLoading } = useSelector(selectLoading);
  const { companyData } = useSelector(selectCompanyData);
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  return (
    <Box
      sx={{
        backgroundColor: companyData.themeColors.primary,
        minHeight: '100vh',
      }}
    >
      <Router>
        <Routes>
          {/* TODO: protect these routes */}
          <Route path="admin">
            <Route index element={<AdminHome />} />
          </Route>
        </Routes>
      </Router>
      <TestComponent />
      {/* <AvatarIcon /> */}
      {/* {isLoading && <CircularProgress />} */}
      {/* {sampleAlert.message && (
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
    </Box>
  );
};

export default App;
