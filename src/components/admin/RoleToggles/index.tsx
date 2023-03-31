import { useEffect, useState } from 'react';
import { Box, Switch, Paper, FormGroup, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';

import { roles } from '../../../data/RoleData';

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

export default function RoleToggles() {
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);
  const [disabledRoleStat, setDisabledRoleStat] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });

  const { companyData } = useSelector(selectCompanyData);

  const switchSx = {
    '& .MuiSwitch-switchBase': {
      '&.Mui-checked': {
        '& + .MuiSwitch-track': {
          backgroundColor: companyData.themeColors.primary,
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: companyData.themeColors.primary,
        },
      },
    },
  };

  useEffect(() => {
    console.log({ checkedRoles });

    if (checkedRoles.length === Object.keys(roles).length - 1) {
      setCheckedRoles([roles.superAdmin]);
    }

    if (checkedRoles.includes(roles.superAdmin)) {
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
  }, [checkedRoles]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCheckedRoles: string[] = [...checkedRoles];
    if (!checkedRoles.includes(e.target.value)) {
      newCheckedRoles.push(e.target.value);
    } else {
      newCheckedRoles = newCheckedRoles.filter(
        (checkedRole) => checkedRole !== e.target.value
      );
    }
    if (newCheckedRoles.includes(roles.superAdmin)) {
      newCheckedRoles = [roles.superAdmin];
    }
    setCheckedRoles(newCheckedRoles);
  };

  return (
    <>
      <Paper elevation={2} sx={outerBoxSx}>
        <FormControlLabel
          control={
            <Switch
              id="switch-super-admin"
              value={roles.superAdmin}
              checked={checkedRoles.includes(roles.superAdmin)}
              onChange={handleRoleChange}
              sx={switchSx}
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
                  value={roles.role1}
                  checked={checkedRoles.includes(roles.role1)}
                  onChange={handleRoleChange}
                  sx={switchSx}
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
                  value={roles.role2}
                  checked={checkedRoles.includes(roles.role2)}
                  onChange={handleRoleChange}
                  sx={switchSx}
                />
              }
              label="Role2"
              labelPlacement="start"
              disabled={disabledRoleStat.role2}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role3"
                  value={roles.role3}
                  checked={checkedRoles.includes(roles.role3)}
                  onChange={handleRoleChange}
                  sx={switchSx}
                />
              }
              label="Role3"
              labelPlacement="start"
              disabled={disabledRoleStat.role3}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role4"
                  sx={switchSx}
                  value={roles.role4}
                  checked={checkedRoles.includes(roles.role4)}
                  onChange={handleRoleChange}
                />
              }
              label="Role4"
              labelPlacement="start"
              disabled={disabledRoleStat.role4}
            />
          </FormGroup>
        </Box>
      </Paper>
    </>
  );
}
