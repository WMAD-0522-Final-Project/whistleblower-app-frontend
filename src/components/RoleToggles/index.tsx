import { useEffect, useState } from 'react';
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
  const [superAdminChecked, setSuperAdminChecked] = useState(false);

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

  useEffect(() => {
    if (superAdminChecked) {
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
  }, [superAdminChecked]);

  //   const { companyData } = useSelector(selectCompanyData);
  const handleSuperAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperAdminChecked(e.target.checked);
  };

  const handleRole1Checked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...checkedRole, role1: e.target.checked });
  };
  const handleRole2Checked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...checkedRole, role2: e.target.checked });
  };
  const handleRole3Checked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...checkedRole, role3: e.target.checked });
  };
  const handleRole4Checked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...checkedRole, role4: e.target.checked });
  };

  return (
    <>
      <Paper elevation={2} sx={outerBoxSx}>
        <FormControlLabel
          control={
            <Switch
              id="switch-super-admin"
              //   sx={{ color: companyData.themeColors.primary }}
              color="warning"
              checked={superAdminChecked}
              onChange={handleSuperAdmin}
            />
          }
          label="SuperAdmin"
          labelPlacement="start"
        />

        <Box sx={innerBoxSx}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  id="switch-role1"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={checkedRole.role1}
                  onChange={handleRole1Checked}
                />
              }
              label="Role1"
              value="role1"
              labelPlacement="start"
              disabled={disabledRole.role1}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role2"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={checkedRole.role2}
                  onChange={handleRole2Checked}
                />
              }
              label="Role2"
              value="role2"
              labelPlacement="start"
              disabled={disabledRole.role2}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role3"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={checkedRole.role3}
                  onChange={handleRole3Checked}
                />
              }
              label="Role3"
              value="role3"
              labelPlacement="start"
              disabled={disabledRole.role3}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role4"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={checkedRole.role4}
                  onChange={handleRole4Checked}
                />
              }
              label="Role4"
              value="role4"
              labelPlacement="start"
              disabled={disabledRole.role4}
            />
          </FormGroup>
        </Box>
      </Paper>
    </>
  );
}
