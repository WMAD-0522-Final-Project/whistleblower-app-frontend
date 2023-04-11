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
  fontSize: '1rem',
};

let innerBoxSx = {
  // width: '150px',
  height: 'fit-content',
  border: '4px solid #DEDEDE',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

type Props = {
  permmisions: string[] | undefined;
  role: string | undefined;
};

export default function RoleToggles({ permmisions, role }: Props) {
  const [checkedPermissions, setCheckedPermissions] = useState<
    string[] | null
  >();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [disabledPermissionsStat, setDisabledPermissionsStat] = useState({
    permission1: false,
    permission2: false,
    permission3: false,
    permission4: false,
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
    setCheckedPermissions(null);
    setUserRole(null);
    if (permmisions && role) {
      setCheckedPermissions(permmisions);
      setUserRole(role);
    }
  }, [permmisions && role]);

  useEffect(() => {
    if (checkedPermissions) {
      // if (checkedPermissions.length === Object.keys(roles).length - 1) {
      //   setCheckedPermissions([roles.]);
      // }
      // if (checkedPermissions.includes('superAdmin')) {
      //   setDisabledPermissionsStat({
      //     permission1: true,
      //     permission2: true,
      //     permission3: true,
      //     permission4: true,
      //   });
      // } else {
      //   setDisabledPermissionsStat({
      //     permission1: false,
      //     permission2: false,
      //     permission3: false,
      //     permission4: false,
      //   });
      // }
    }
  }, [checkedPermissions]);
  const roleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedPermissions) {
      let newcheckedPermissions: string[] = [...checkedPermissions];

      if (!checkedPermissions.includes(e.target.value)) {
        newcheckedPermissions.push(e.target.value);
      } else {
        newcheckedPermissions = newcheckedPermissions.filter(
          (checkedRole) => checkedRole !== e.target.value
        );
        console.log(newcheckedPermissions, 'new check');
      }
      // if (newcheckedPermissions.includes(roles)) {
      //   newcheckedPermissions = [roles.];
      // }
      setCheckedPermissions(newcheckedPermissions);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={outerBoxSx}>
        <FormControlLabel
          control={
            <Switch
              id="switch-super-admin"
              checked={userRole?.includes(roles.role)}
              onChange={roleSwitch}
              sx={switchSx}
            />
          }
          label={roles.role}
          labelPlacement="start"
        />

        <Box sx={innerBoxSx}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  id="switch-role1"
                  value={roles.permission1}
                  checked={checkedPermissions?.includes(roles.permission1)}
                  onChange={handleRoleChange}
                  sx={switchSx}
                />
              }
              label={roles.permission1}
              labelPlacement="start"
              disabled={disabledPermissionsStat.permission1}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role2"
                  value={roles.permission2}
                  checked={checkedPermissions?.includes(roles.permission2)}
                  onChange={handleRoleChange}
                  sx={switchSx}
                />
              }
              label={roles.permission2}
              labelPlacement="start"
              disabled={disabledPermissionsStat.permission2}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role3"
                  value={roles.permission3}
                  checked={checkedPermissions?.includes(roles.permission3)}
                  onChange={handleRoleChange}
                  sx={switchSx}
                />
              }
              label={roles.permission3}
              labelPlacement="start"
              disabled={disabledPermissionsStat.permission3}
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch-role4"
                  sx={switchSx}
                  value={roles.permission4}
                  checked={checkedPermissions?.includes(roles.permission4)}
                  onChange={handleRoleChange}
                />
              }
              label={roles.permission4}
              labelPlacement="start"
              disabled={disabledPermissionsStat.permission4}
            />
          </FormGroup>
        </Box>
      </Paper>
    </>
  );
}
