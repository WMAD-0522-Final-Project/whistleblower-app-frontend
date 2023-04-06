import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import { setUserData } from './RTK/userDataSlice';
import { selectUserData } from './RTK/userDataSlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';
import YellowMashroom from './components/SVG/YellowMashroom';

const App = () => {
  const { isLoading } = useSelector(selectLoading);
  const { companyData } = useSelector(selectCompanyData);
  const loadingDispatch = useDispatch();
  loadingDispatch(setLoading(true));

  let location = useLocation();

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

  console.log(location.pathname, 'this is location ');

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: companyData.themeColors.primary,
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
          overflow: 'hidden',
          zIndex: '-2',
        }}
      >
        <div style={{ position: 'absolute', zIndex: '-1' }}>
          <YellowMashroom
            animate={
              location.pathname === '/admin'
                ? { rotate: 100 }
                : location.pathname === '/general'
                ? { rotate: -100 }
                : {}
            }
            transition={{ duration: 1 }}
          ></YellowMashroom>
        </div>

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
