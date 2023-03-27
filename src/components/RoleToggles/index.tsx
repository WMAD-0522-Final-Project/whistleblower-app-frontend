import { useState } from 'react';
import {
  Box,
  Switch,
  Paper,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type Props = {};

// const roles = ['role1', 'role2', 'role3', 'role4'];

const outerBoxSx = {
  backgroundColor: 'white',
  borderRadius: '10px',
  width: 'fit-content',
  height: 'fit-content',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

let innerBoxSx = {
  width: '150px',
  height: 'fit-content',
  border: '4px solid #DEDEDE',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function RoleToggles({}: Props) {
  const [superAdminToggle, setSuperAdminToggle] = useState(false);
  const [checkedRole, setCheckedRole] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });
  const [disabledRole, setDisabledRole] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });

  //   const { companyData } = useSelector(selectCompanyData);
  const handleSuperAdmin = () => {
    setSuperAdminToggle(!superAdminToggle);
    if (!superAdminToggle) {
      setCheckedRole({
        role1: false,
        role2: false,
        role3: false,
        role4: false,
      });
      setDisabledRole({
        role1: true,
        role2: true,
        role3: true,
        role4: true,
      });
    } else {
      setDisabledRole({
        role1: false,
        role2: false,
        role3: false,
        role4: false,
      });
    }
  };

  return (
    <>
      <FormGroup>
        <Paper elevation={2} sx={outerBoxSx}>
          <FormControlLabel
            control={
              <Switch
                id="super-admin-toggle"
                //   sx={{ color: companyData.themeColors.primary }}
                color="warning"
                onChange={handleSuperAdmin}
              />
            }
            label="SuperAdmin"
            labelPlacement="start"
            defaultChecked={false}
            checked={superAdminToggle}
          />

          <Box sx={innerBoxSx}>
            <FormControlLabel
              control={
                <Switch
                  id="role1-toggle"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  onChange={handleSuperAdmin}
                />
              }
              label="Role1"
              labelPlacement="start"
              defaultChecked={false}
              checked={checkedRole.role1}
              disabled={disabledRole.role1}
            />
            <FormControlLabel
              control={
                <Switch
                  id="role2-toggle"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  onChange={handleSuperAdmin}
                />
              }
              label="Role2"
              labelPlacement="start"
              defaultChecked={false}
              checked={checkedRole.role2}
              disabled={disabledRole.role2}
            />
            <FormControlLabel
              control={
                <Switch
                  id="role3-toggle"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  onChange={handleSuperAdmin}
                />
              }
              label="Role3"
              labelPlacement="start"
              defaultChecked={false}
              checked={checkedRole.role3}
              disabled={disabledRole.role3}
            />
            <FormControlLabel
              control={
                <Switch
                  id="role4-toggle"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  onChange={handleSuperAdmin}
                />
              }
              label="Role4"
              labelPlacement="start"
              defaultChecked={false}
              checked={checkedRole.role4}
              disabled={disabledRole.role4}
            />
          </Box>
        </Paper>
      </FormGroup>
    </>
  );
}
