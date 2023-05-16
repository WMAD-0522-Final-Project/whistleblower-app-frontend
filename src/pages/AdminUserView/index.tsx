import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import sampleUserDatas from '../../temp/sampleUserDatas';
import { useAllContext } from '../../context/ClaimIdContext';
import { adminUser } from '../../types';
import RoleToggles from '../../components/admin/RoleToggles';
import { NativeSelect, Theme, useMediaQuery } from '@mui/material';
import ItemLabel from '../../components/ItemLabel';
import UserViewCard from '../../components/admin/AdminUserViewCard';
import styles from './AdminUserView.module.scss';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import Closebutton from '../../components/SVG/Closebutton';
import useLetterColor from '../../hooks/useLetterColor';
type adminUserUpdate = {
  email: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  permissions: string[];
  role: string;
};

type UserUpdataReqBody = {
  userId: string | undefined;
  userInfo: Partial<adminUserUpdate> | undefined;
};
function AdminUserView() {
  const [text, setText] = useState('');
  const [allUsers, setAllUsers] = useState<null | adminUser[]>(null);
  const { letterColor } = useLetterColor();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const smallmatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );
  const middlematches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  const semilargematches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between(770, 1300)
  );
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const [nowUser, setNowUser] = useState<Partial<adminUser> | null>(null);

  useEffect(() => {
    console.log(nowUser, 'nowUserdesuuuuuuu');
  }, [nowUser]);

  useEffect(() => {
    if (context.AdminUserIdAdmin !== '') {
      if (allUsers) {
        const user = allUsers.filter(
          (user) => user._id === context.AdminUserIdAdmin
        )[0];
        setNowUser(user);
      }
    }
  }, [context.AdminUserIdAdmin]);

  const getUser = async (): Promise<AxiosResponse<adminUser[]>> => {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/list`,
      params: { role: 'admin' },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });

    return res.data;
  };

  const { data: users } = useQuery({
    queryFn: getUser,
    queryKey: ['adminUsers'],
  });

  useEffect(() => {
    if (users) setAllUsers(users.users);
  }, [users]);

  const modifySubmit = () => {
    //submit nowUser with fetch
    if (nowUser) {
      console.log(nowUser, 'submit imgonna');
      userMutation.mutate({
        userId: nowUser._id,
        userInfo: {
          email: nowUser.email,
          firstName: nowUser.firstName,
          lastName: nowUser.lastName,
          departmentId: nowUser.departmentId,
          permissions: nowUser.permissions
            ? nowUser.permissions.map((perm) => perm.name)
            : [],
          role: 'admin',
        },
      });
    }
  };

  const userModifyForm = async (data: UserUpdataReqBody) => {
    const res: AxiosResponse<adminUser> = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/${
        data.userId
      }/info/update`,
      headers: { Authorization: getAuthorizationValue() },
      data: data.userInfo,
    });
    return res.data;
  };

  const userMutation = useMutation({
    mutationFn: userModifyForm,
    onSuccess: () => {
      console.log('suceess');
    },
    onError: () => console.log('failed'),
  });

  const closeEdit = () => {
    setContext((context) => ({
      ...context,
      AdminUserIdAdmin: '',
    }));
    setNowUser(null);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
          justifyContent: 'space-around',
          // marginTop: '-3%',
          marginTop: matches ? '-3%' : '-14%',
          marginBottom: matches ? '-3%' : '-7%',
          width: '100vw',
          height: '70vh',
        }}
      >
        {!matches && nowUser ? (
          <div></div>
        ) : (
          <CustomBox sx={{ height: '90%', width: matches ? '70%' : '90%' }}>
            <SearchBox
              onChange={(e) => setText(e.target.value)}
              sx={{ width: 300, height: 50 }}
            ></SearchBox>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '400px',
                overflowY: 'scroll',
                marginTop: '6%',
              }}
              className={styles.box}
            >
              {allUsers &&
                allUsers
                  .filter((user, i) => {
                    if (text == '') {
                      return user;
                    } else if (
                      user.firstName.toLowerCase().includes(text.toLowerCase())
                    ) {
                      return user;
                    }
                  })
                  .map((user, i) => {
                    return (
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '30%',
                          marginTop: middlematches
                            ? `${32 * i - 10 * i}%`
                            : `${30 * i}%`,
                          display: 'flex',
                          justifyContent: 'center',
                          top: 10,
                        }}
                        key={i}
                      >
                        <UserViewCard
                          whileHover={{ x: 20 }}
                          user={user}
                          width={80}
                          height={100}
                          url={user.avatarUrl}
                          edit={true}
                          sx={{ marginBottom: '20px' }}
                        ></UserViewCard>
                      </div>
                    );
                  })}
            </div>
          </CustomBox>
        )}

        {nowUser && (
          <CustomBox
            // animate={claimId !== '' ? { display: 'inline-block' } : {}}
            sx={{
              width: matches ? '40%' : '90%',
              height: '90%',
              fontSize: '1rem',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '490px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: '100%',
                  height: '90%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                      left: '10%',
                    }}
                  ></div>
                  <div
                    onClick={closeEdit}
                    style={{
                      position: 'relative',
                      top: matches ? '-46%' : '-20%',
                    }}
                  >
                    <Closebutton></Closebutton>
                  </div>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    // border: 'solid 4px black',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={letterColor}
                      text="first name"
                      sx={{
                        fontSize: '1rem',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                    }}
                    value={nowUser.firstName}
                    onChange={(e) =>
                      setNowUser((pre) => ({
                        ...pre,
                        firstName: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={letterColor}
                      text="last name"
                      sx={{
                        fontSize: '1rem',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                    }}
                    value={nowUser.lastName}
                    onChange={(e) =>
                      setNowUser((pre) => ({
                        ...pre,
                        lastName: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={letterColor}
                      text="email"
                      sx={{
                        fontSize: '1rem',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    ></ItemLabel>
                  </h1>
                  <input
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                    }}
                    value={nowUser.email}
                    onChange={(e) =>
                      setNowUser((pre) => ({
                        ...pre,
                        email: e.target.value,
                      }))
                    }
                  ></input>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={letterColor}
                      text="department"
                      sx={{
                        fontSize: '1rem',
                        width: '50%',
                        height: '85%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    ></ItemLabel>
                  </h1>

                  <div
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                    }}
                  >
                    {/* <SelectBoxLabel
                        placeholder={
                          nowUser.department?.name ? nowUser.department.name : ''
                        }
                        label=""
                        name=""
                        color={companyData.themeColors.primary}
                        selectBoxSx={{
                          width: '150%',
                          marginLeft: '-25%',
                          '& .MuiSelect-select': {
                            padding: '1rem',
                          },
                        }}
                      ></SelectBoxLabel> */}
                    <NativeSelect
                      defaultValue={nowUser.department?.name}
                      sx={{ width: '100%', border: 'solid 2px black' }}
                      onChange={(e) =>
                        setNowUser((pre) => ({
                          ...pre,
                          department: {
                            _id: companyData.departments.filter(
                              (dep) => dep.name === e.target.value
                            )[0]._id,
                            name: e.target.value,
                          },
                        }))
                      }
                    >
                      {companyData.departments.map((dep, i) => {
                        return (
                          <option
                            value={dep.name}
                            key={i}
                          >{`${dep.name}`}</option>
                        );
                      })}
                    </NativeSelect>
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginLeft: '25px',
                  }}
                >
                  <h1
                    style={{
                      width: '50%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '5%',
                      marginLeft: '1%',
                    }}
                  >
                    <ItemLabel
                      bgColor={companyData.themeColors.primary}
                      textColor={letterColor}
                      text="permissions"
                      sx={{
                        fontSize: '1rem',
                        width: '60%',
                        height: '18%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    ></ItemLabel>
                  </h1>
                  <div
                    style={{
                      width: '50%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10%',
                    }}
                  >
                    <RoleToggles
                      permmisions={nowUser.permissions?.map((e) => e.name)}
                      permissionsResult={
                        (result) =>
                          setNowUser((pre) => ({
                            ...pre,
                            permissions: result.map((perm) => {
                              return { _id: ';lkj', name: perm };
                            }),
                          }))
                        // console.log(result, ';lkj')
                      }
                    ></RoleToggles>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  height: '10%',
                  marginTop: '-2%',
                }}
              >
                <ButtonComponent
                  customColor={companyData.themeColors.secondary}
                  type="submit"
                  onClick={modifySubmit}
                  sx={{
                    color: 'black',
                    boxShadow: '2px 2px 2px 2px rgba(0.2,0.2,0.2,0.2)',
                    padding: '0.7rem',
                    borderRadius: '7px',
                  }}
                >
                  submit
                </ButtonComponent>
              </div>
            </div>
          </CustomBox>
        )}
      </div>
    </>
  );
}

export default AdminUserView;
