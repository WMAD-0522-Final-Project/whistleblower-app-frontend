import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
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

  return (
    <Box
      sx={{
        backgroundColor: companyData.themeColors.primary,
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <Header />
      <AvatarIcon />
      <Router>
        <Routes>
          {/* TODO: protect these routes */}
          <Route path="admin">
            <Route index element={<AdminHome />} />
          </Route>
        </Routes>
      </Router>
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

      {/* <ButtonComponent
        width="100px"
        height="50px"
        customColor="#f96a02"
        variant="contained"
      >
        submit
      </ButtonComponent> */}
    </Box>
  );
};

export default App;
