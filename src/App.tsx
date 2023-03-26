import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
  Typography,
  Button,
} from '@mui/material';
import TestComponent from './components/MUI_comp/TestComponent';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import AdminHome from './pages/AdminHome';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import { setUserData } from './RTK/userDataSlice';
import { selectUserData } from './RTK/userDataSlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';
import PopupModal from './components/MUI_comp/PopupModal';
import ConfirmationModal from './components/ConfirmationModal';

const App = () => {
  const { isLoading } = useSelector(selectLoading);
  const { companyData } = useSelector(selectCompanyData);
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));
  // TODO: get user data from store
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserData({ firstName: 'Isaac', lastName: 'Wu', profileImg: 'n/a' })
    );
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // use Redux for loading state

  // use Redux for alert state
  const sampleAlert = {
    message: 'test alert!',
    type: 'success',
  };

  const submitData = () => {
    console.log('Confirmed!!!!!!!!!!!');
  };

  return (
    <Box
      sx={{
        backgroundColor: companyData.themeColors.primary,
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <AvatarIcon />
      {/* <Header />
      <AvatarIcon /> */}
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
