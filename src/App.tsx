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
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import AdminHome from './pages/AdminHome';
import { setLoading } from './RTK/loadingSlice';
import { selectLoading } from './RTK/loadingSlice';
import { selectCompanyData } from './RTK/companySlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';

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

  // Juan is making the theme here
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* {isLoading && <CircularProgress />} */}
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
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* TODO: protect these routes */}
            {/* <Route path="admin">
              <Route index element={<AdminHome />} />
            </Route> */}
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
