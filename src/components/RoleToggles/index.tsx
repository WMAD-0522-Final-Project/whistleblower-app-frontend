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
  const [superAdminCheckedStat, setSuperAdminCheckedStat] = useState(false);

  const [roleCheckedStat, setCheckedRole] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });
  const [disabledRoleStat, setDisabledRoleStat] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });
  const [checkedRoles, setCheckedRoles] = useState([]);

  useEffect(() => {
    if (superAdminCheckedStat) {
      setCheckedRole({
        role1: false,
        role2: false,
        role3: false,
        role4: false,
      });
      setDisabledRoleStat({
        role1: true,
        role2: true,
        role3: true,
        role4: true,
      });
    } else {
      setDisabledRoleStat({
        role1: false,
        role2: false,
        role3: false,
        role4: false,
      });
    }
  }, [superAdminCheckedStat]);

  //   const { companyData } = useSelector(selectCompanyData);
  const handleSuperAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperAdminCheckedStat(e.target.checked);
  };

  const handleRole1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...roleCheckedStat, role1: e.target.checked });
    const index = checkedRoles.indexOf(e.target.value);
  };
  const handleRole2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...roleCheckedStat, role2: e.target.checked });
  };
  const handleRole3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...roleCheckedStat, role3: e.target.checked });
  };
  const handleRole4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRole({ ...roleCheckedStat, role4: e.target.checked });
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
              checked={superAdminCheckedStat}
              onChange={handleSuperAdminChange}
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
                  value="role1"
                  checked={roleCheckedStat.role1}
                  onChange={handleRole1Change}
                />
              }
              label="Role1"
              labelPlacement="start"
              disabled={disabledRoleStat.role1}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role2"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={roleCheckedStat.role2}
                  onChange={handleRole2Change}
                />
              }
              label="Role2"
              value="role2"
              labelPlacement="start"
              disabled={disabledRoleStat.role2}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role3"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={roleCheckedStat.role3}
                  onChange={handleRole3Change}
                />
              }
              label="Role3"
              value="role3"
              labelPlacement="start"
              disabled={disabledRoleStat.role3}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role4"
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  checked={roleCheckedStat.role4}
                  onChange={handleRole4Change}
                />
              }
              label="Role4"
              value="role4"
              labelPlacement="start"
              disabled={disabledRoleStat.role4}
            />
          </FormGroup>
        </Box>
      </Paper>
    </>
  );
}
