import { useEffect, useState } from 'react';
import { Box, Switch, Paper, FormGroup, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';
import styles from './RoleToggles.module.scss';

// import { permissionNames } from '../../../data/RoleData';
import { permissionNames } from '../../../data/RoleData';
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

type PermissionType = {
  name: string;
  is: boolean;
};

type Props = {
  permmisions: string[] | undefined;
  permissionsResult: (result: string[]) => void;
};
export default function RoleToggles({ permmisions, permissionsResult }: Props) {
  const { companyData } = useSelector(selectCompanyData);
  const [checkedPermissions, setCheckedPermissions] = useState<
    PermissionType[]
  >(
    permissionNames.map((perm, i) => {
      return { name: perm, is: false };
    })
  );

  useEffect(() => {
    setCheckedPermissions(
      checkedPermissions.map((perm, i) => {
        if (permmisions?.includes(perm.name)) {
          perm.is = true;
        } else {
          perm.is = false;
        }
        return perm;
      })
    );
  }, [permmisions]);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPermissions(
      checkedPermissions.map((perm, i) => {
        if (perm.name === e.target.name) {
          perm.is = e.target.checked;
        }
        return perm;
      })
    );
    const permString = checkedPermissions.filter((perm) => perm.is === true);
    permissionsResult(permString.map((perm) => perm.name));
  };
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
  return (
    <>
      <div
        className={styles.toggleBox}
        style={{
          height: '70%',
          overflow: 'scroll',
          border: `black 2px solid`,
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        {checkedPermissions.map((permission, i) => {
          return (
            <>
              <FormControlLabel
                label={permission.name}
                control={
                  <Switch
                    name={permission.name}
                    checked={permission.is}
                    onChange={handle}
                    sx={switchSx}
                  ></Switch>
                }
              ></FormControlLabel>
            </>
          );
        })}
      </div>
    </>
  );
}
