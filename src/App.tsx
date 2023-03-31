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
import RoleToggles from './components/admin/RoleToggles';

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
    <>
      <RoleToggles></RoleToggles>
    </>
  );
};

export default App;
