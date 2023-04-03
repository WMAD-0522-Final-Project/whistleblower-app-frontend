import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  ThemeProvider,
  Typography,
  Button,
} from '@mui/material';
import theme from './theme';
import Login from './pages/Login';
import TestComponent from './components/MUI_comp/TestComponent';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import GeneralHome from './pages/GeneralHome';
import AdminHome from './pages/AdminHome';
import ThemeEdit from './pages/ThemeEdit';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import { setUserData } from './RTK/userDataSlice';
import { selectUserData } from './RTK/userDataSlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';
import ConfirmationModal from './components/ConfirmationModal';
import Settings from './components/MUI_comp/Settings';

const App = () => {
  const { isLoading } = useSelector(selectLoading);
  const { companyData } = useSelector(selectCompanyData);
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));
  // TODO: get user data from store
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({ firstName: 'Isaac', lastName: 'Wu', profileImg: 'n/a' });
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  const submitData = () => {
    console.log('Confirmed!!!!!!!!!!!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: companyData.themeColors.primary,
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <Router>
          <Header />
          <AvatarIcon />
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* TODO: protect these routes */}
            <Route path="general">
              <Route index element={<GeneralHome />} />
            </Route>
            <Route path="admin">
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="settings">
              <Route index element={<ThemeEdit />} />
            </Route>
          </Routes>
        </Router>
        {/* <TestComponent /> */}
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
    </ThemeProvider>
  );
};

export default App;
