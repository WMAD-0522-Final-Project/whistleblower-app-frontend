import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Theme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import theme from './theme';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import GeneralHome from './pages/GeneralHome';
import AdminHome from './pages/AdminHome';
import Contact from './pages/Contact';
import { selectCompanyData, setCompanyData } from './RTK/companySlice';
import YellowMashroom from './components/SVG/YellowMashroom';
import { useAnimationControls } from 'framer-motion';
import AdminUserView from './pages/AdminUserView';
import GeneralUserView from './pages/GeneralUserView';
import Settings from './components/MUI_comp/Settings';
import AdminLayout from './components/admin/AdminLayout';
import GeneralLayout from './components/general/GeneralLayout';
import UserInquiries from './pages/UserInquiries';
import { useAllContext } from './context/ClaimIdContext';
import UserViewer from './pages/UserViewer';
import AdminLogList from './pages/AdminLogList';
import ControlRoute from './components/ControlRoute';
import ThemeEdit from './pages/ThemeEdit';
import { CompanyDataTypes } from './types';
import axios from 'axios';
import getAuthorizationValue from './helpers/getAuthorizationValue';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const dispatch = useDispatch();

  const location = useLocation();
  const yellowControl = useAnimationControls();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const getCompanyData = async (): Promise<CompanyDataTypes> => {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/company/info`,
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });

    return res.data;
  };

  const { data: CompanyDataBend } = useQuery({
    queryFn: getCompanyData,
    queryKey: ['CompanyDataFromBackend'],
  });

  useEffect(() => {
    const setBackEnd = () => {
      dispatch(
        setCompanyData({
          ...CompanyDataBend?.company,
        })
      );
    };
    if (CompanyDataBend !== undefined) {
      setBackEnd();
    }
  }, [CompanyDataBend]);

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: companyData.themeColors.primary,
          minHeight: '110vh',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: '1',
          [theme.breakpoints.up('lg')]: {
            overflow: 'hidden',
          },
        }}
      >
        {isLg && (
          <div style={{ position: 'absolute', zIndex: '-1' }}>
            <YellowMashroom
              animate={yellowControl}
              transition={{ duration: 1 }}
            ></YellowMashroom>
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="admin">
            <Route element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="adminUserView" element={<AdminUserView />} />
              <Route path="generalUserView" element={<GeneralUserView />} />
              <Route path="userView" element={<UserViewer />} />
              <Route path="user-inquiries" element={<UserInquiries />} />
              <Route path="settings" element={<ThemeEdit />} />
              <Route path="logs" element={<AdminLogList />} />
            </Route>
          </Route>
          <Route path="general">
            <Route element={<GeneralLayout />}>
              <Route index element={<GeneralHome />} />
            </Route>
          </Route>
          <Route path="/" element={<ControlRoute />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
