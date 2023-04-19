import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import TestComponent from './components/MUI_comp/TestComponent';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import Login from './pages/Login';
import GeneralHome from './pages/GeneralHome';
import AdminHome from './pages/AdminHome';
import Contact from './pages/Contact';
import ThemeEdit from './pages/ThemeEdit';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import { setUserData } from './RTK/userDataSlice';
import { selectUserData } from './RTK/userDataSlice';
import YellowMashroom from './components/SVG/YellowMashroom';
import { useAnimationControls } from 'framer-motion';
import AdminUserView from './pages/AdminUserView';
import GeneralUserView from './pages/GeneralUserView';
import { Claim } from './types';
import AdminSetting from './pages/AdminSetting';
import Settings from './components/MUI_comp/Settings';
import AdminLayout from './components/admin/AdminLayout';
import GeneralLayout from './components/general/GeneralLayout';
import CompanySetting from './pages/CompanySetting';
import AvatarIcon from './components/admin/AvatarIcon';

import { ContextType } from './types';
import { useAllContext } from './context/ClaimIdContext';
const App = () => {
  const { isLoading } = useSelector(selectLoading);
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));

  let location = useLocation();

  const yellowControl = useAnimationControls();

  // TODO: get user data from store
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  useEffect(() => {
    setUserData({ firstName: 'Isaac', lastName: 'Wu', profileImg: 'n/a' });
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    // if (location.pathname === '/admin') yellowControl.start({ rotate: 100 });
    // if (location.pathname === '/general') yellowControl.start({ rotate: -100 });
    setContext((context) => ({
      ...context,
      yellowRotate: context.yellowRotate + 70,
    }));
    yellowControl.start({ rotate: context.yellowRotate });
    console.log(context.yellowRotate, 'yellowrotate');
  }, [location]);

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
          overflow: 'hidden',
          zIndex: '1',
        }}
      >
        <div style={{ position: 'absolute', zIndex: '-1' }}>
          <YellowMashroom
            animate={yellowControl}
            transition={{ duration: 1 }}
          ></YellowMashroom>
        </div>

        {/* <Header /> */}
        {/* <AvatarIcon /> */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          {/* TODO: protect these routes */}
          <Route path="general">
            <Route element={<GeneralLayout />}>
              <Route index element={<GeneralHome />} />
            </Route>
          </Route>
          <Route path="admin">
            <Route element={<AdminLayout />}>
              <Route path="" element={<AdminHome />} />
              <Route path="adminUserView" element={<AdminUserView />} />
              <Route path="generalUserView" element={<GeneralUserView />} />
            </Route>
            <Route path="setting" element={<Settings />} />
          </Route>
        </Routes>
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
