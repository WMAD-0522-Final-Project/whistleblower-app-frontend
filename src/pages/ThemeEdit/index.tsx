import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCompanyData } from '../../RTK/companySlice';
import SettingsGlobal from './SettingsGlobal';
import checkPermission from '../../helpers/checkPermission';
import { UserPermissionOption } from '../../types/enums';
import { selectUserData } from '../../RTK/userDataSlice';
import SectionTitle from '../../components/SectionTitle';

const ThemeEdit = () => {
  const { companyData } = useSelector(selectCompanyData);
  const [admin, setAdmin] = useState(false);
  const { userData } = useSelector(selectUserData);
  const navigator = useNavigate();

  useEffect(() => {
    // check permission
    if (
      !checkPermission(
        UserPermissionOption.SYSTEM_MANAGEMENT,
        userData.permissions
      )
    ) {
      navigator('/');
    }
  }, []);

  const StylesAdmin = {
    display: 'flex',
    borderRadius: '10px',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    m: '5rem auto',
    maxWidth: '1000px',
    '& > :nth-child(1)': {
      display: 'grid',
      placeItems: 'center',
      width: '60%',
    },
    '& > :nth-child(2)': {
      width: '40%',
      marginTop: '0',
    },
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      maxWidth: '450px',
      '& > :nth-child(1)': {
        width: '100%',
      },
      '& > :nth-child(2)': {
        width: '100%',
        marginTop: '10px',
      },
    },
  };
  const StyleUser = {
    borderRadius: '10px',
    backgroundColor: '#FFF',
    m: '5rem auto',
    maxWidth: '450px',
    padding: '40px 10px 40px 10px',
    '& > :nth-child(1)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& > :last-child': {
        marginTop: '30px',
      },
    },
  };

  return (
    <>
      <SectionTitle title="Company Setting" />
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}
      >
        {/* width: '100vs', height: '70vh', display: 'grid', placeContent: 'center' */}
        <SettingsGlobal />
        {/* <button onClick={()=>{setAdmin(!admin)}}>{admin? 'admin': 'user'}</button>
      <Box sx={admin? StylesAdmin: StyleUser}>
      
      {admin? 
        <>
        <div style={{backgroundColor: 'gray'}}>Users List Here!</div>
        <div>
        <Settings/>
          </div>
          </>:
          <div>
          <p style={{paddingBottom: '30px',
          color: companyData.themeColors.primary,
          fontWeight: 'bolder',
          fontSize: '2rem'}}>General Settings</p>
          
          <TextFieldCustom
          label="First Name"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.primary}
              textColor="black"
              required
              />
              <TextFieldCustom
              label="Last Name"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.primary}
              textColor="black"
              required
              />
              <TextFieldCustom
              label="Mail"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.primary}
              textColor="black"
              required
              />
            <TextFieldCustom
              label="Department"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.primary}
              textColor="black"
              required
              />
              <ButtonComponent
              onClick={()=>{}}
              variant="contained"
              customColor={companyData.themeColors.primary}
              width= "50%"
              >
              Clickme
              </ButtonComponent>
              
              </div>
            }
            
          </Box> */}
      </div>
    </>
  );
};

export default ThemeEdit;
