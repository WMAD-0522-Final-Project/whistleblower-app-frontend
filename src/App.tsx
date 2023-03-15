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
import { setUserData } from './RTK/userDataSlice';
import { selectUserData } from './RTK/userDataSlice';
import AvatarIcon from './components/admin/AvatarIcon';
import ButtonComponent from './components/MUI_comp/ButtonComponent';

// TODO: get company data from store
const companyData = {
  themeColors: {
    primary: '#f96a02',
    secondary: '#fff',
  },
};

const App = () => {
  // TODO: get user data from store
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  dispatch(
    setUserData({ firstName: 'Isaac', lastName: 'Wu', profileImg: 'n/a' })
  );
  console.log(userData);

  // use Redux for loading state
  const isLoading = useSelector(selectLoading);

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
      <AvatarIcon />
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
