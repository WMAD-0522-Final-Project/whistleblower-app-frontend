import { Box, Alert, AlertTitle, CircularProgress } from '@mui/material';
import AvatarIcon from './components/admin/AvatarIcon';
// import ButtonComponent from './components/MUI_comp/ButtonComponent';
import ButtonComponent from './components/MUI_comp/ButtonComponent';

// TODO: get company data from store
const companyData = {
  themeColors: {
    primary: '#f96a02',
    secondary: '#fff',
  },
};
// TODO: get user data from store
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  profileImg: '/images/profileImg.jpg',
};

const App = () => {
  // use Redux for loading state
  const isLoading = true;

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
    </Box>
  );
};

export default App;
