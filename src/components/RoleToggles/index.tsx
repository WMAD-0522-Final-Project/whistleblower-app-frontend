import { useEffect, useState } from 'react';
import { Box, Switch, Paper, FormGroup, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';

type Props = {};

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

const roles = {
  superAdmin: 'superAdmin',
  role1: 'role1',
  role2: 'role2',
  role3: 'role3',
  role4: 'role4',
};

export default function RoleToggles({}: Props) {
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);

  const [disabledRoleStat, setDisabledRoleStat] = useState({
    role1: false,
    role2: false,
    role3: false,
    role4: false,
  });

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
    if (!checkedRoles.includes(e.target.value)) {
      setCheckedRoles([...checkedRoles, e.target.value]);
    } else {
      setCheckedRoles(
        checkedRoles.filter((checkedRole) => checkedRole !== e.target.value)
      );
    }
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
              value={roles.superAdmin}
              // checked={superAdminCheckedStat}
              checked={checkedRoles.includes(roles.superAdmin)}
              onChange={handleRoleChange}
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
                  value={roles.role1}
                  // checked={roleCheckedStat.role1}
                  checked={checkedRoles.includes(roles.role1)}
                  onChange={handleRoleChange}
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
                  value={roles.role2}
                  checked={checkedRoles.includes(roles.role2)}
                  onChange={handleRoleChange}
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
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
                  value={roles.role3}
                  checked={checkedRoles.includes(roles.role3)}
                  onChange={handleRoleChange}
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
                  //   sx={{ color: companyData.themeColors.primary }}
                  color="warning"
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
