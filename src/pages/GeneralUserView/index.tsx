import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import sampleUserDatas from '../../temp/sampleUserDatas';
import { useAllContext } from '../../context/ClaimIdContext';
import { adminUser, generalUser } from '../../types';
import RoleToggles from '../../components/admin/RoleToggles';
import { NativeSelect, TextField, Theme, useMediaQuery } from '@mui/material';
import ItemLabel from '../../components/ItemLabel';
import AdminUserViewCard from '../../components/admin/AdminUserViewCard';
import styles from './GeneralUserView.module.scss';
import GeneralUserViewCard from '../../components/admin/GeneralUserViewCard';
import Closebutton from '../../components/SVG/Closebutton';
import TextFieldCustom from '../../components/MUI_comp/TextFieldCustom';
import ButtonComponent from '../../components/MUI_comp/ButtonComponent';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import getAuthorizationValue from '../../helpers/getAuthorizationValue';

type UserUpdataReqBody = {
  userId: string | undefined;
  userInfo: Partial<adminUser> | undefined;
};
function GeneralUserView() {
  const [text, setText] = useState('');
  const [allUsers, setAllUsers] = useState<null | adminUser[]>(null);
  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const [nowUser, setNowUser] = useState<Partial<adminUser> | null>(null);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const middlemaches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );
  const smallmatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  );
  const semilargematches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between(770, 1300)
  );

  useEffect(() => {
    console.log(semilargematches, 'semioarge');
  }, [semilargematches]);

  useEffect(() => {
    if (context.GeneralUserId !== '') {
      if (allUsers) {
        const user = allUsers.filter(
          (user) => user._id === context.GeneralUserId
        )[0];
        setNowUser(user);
      }
    }
  }, [context.GeneralUserId]);

  const getUser = async (): Promise<AxiosResponse<adminUser[]>> => {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/user/list`,
      params: { role: 'general' },
      headers: {
        Authorization: getAuthorizationValue(),
      },
    });

    return res.data;
  };

  const { data: users } = useQuery({
    queryFn: getUser,
    queryKey: ['generalUsers'],
  });

  useEffect(() => {
    if (users) setAllUsers(users.users);
    console.log(users, 'users');
  }, [users]);

  const modifySubmit = () => {
    //submit nowUser with fetch
    if (nowUser) {
      userMutation.mutate({ userId: nowUser._id, userInfo: nowUser });
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
    //submit nowUser with fetch
  };

  const userMutation = useMutation({
    mutationFn: userModifyForm,
    onSuccess: () => {
      console.log('success');
    },
    onError: () => console.log('failed'),
  });

  const closeEdit = () => {
    setContext((context) => ({
      ...context,
      GeneralUserId: '',
    }));
    setNowUser(null);
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          marginTop: middlemaches ? '-3%' : '-13%',
          marginBottom: middlemaches ? '-3%' : '-13%',
          width: '100vw',
          height: '70vh',
        }}
      >
        {!matches && nowUser ? (
          <div></div>
        ) : (
          <CustomBox sx={{ height: '90%', width: matches ? '40%' : '90%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <SearchBox
                onChange={(e) => setText(e.target.value)}
                sx={{ width: 300, height: 50 }}
              ></SearchBox>
            </div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '400px',
                overflow: 'scroll',
                marginTop: '6%',
                // backgroundColor: 'red',
              }}
              className={styles.bix}
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
                          // marginTop: `${13 * i}%`,
                          marginTop: middlemaches
                            ? `${25 * i - 5 * i}%`
                            : `${25 * i}%`,
                          display: 'flex',
                          justifyContent: 'center',
                          top: 10,
                        }}
                      >
                        <GeneralUserViewCard
                          whileHover={{ x: 20 }}
                          user={user}
                          width={80}
                          height={60}
                          url={user.profileImg}
                          edit={true}
                          sx={{ marginBottom: '20px' }}
                        ></GeneralUserViewCard>
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
              // width: '40%',
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
                >
                  user id : {nowUser._id}
                </div>
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
                className={styles.editBox}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  height: '70%',
                  overflow: 'scroll',
                  marginBottom: '10px',
                  marginTop: '-40px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    // border: 'solid 4px black',
                  }}
                >
                  {smallmatches ? (
                    <>
                      <h1
                        style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <ItemLabel
                          bgColor={companyData.themeColors.primary}
                          textColor={companyData.themeColors.secondary}
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
                    </>
                  ) : (
                    <div
                      style={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: '10%',
                      }}
                    >
                      <TextFieldCustom
                        label="firstName"
                        value={nowUser.firstName}
                        width="10"
                        height="10"
                        mainColor={companyData.themeColors.primary}
                      ></TextFieldCustom>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  {smallmatches ? (
                    <>
                      <h1
                        style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <ItemLabel
                          bgColor={companyData.themeColors.primary}
                          textColor={companyData.themeColors.secondary}
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
                    </>
                  ) : (
                    <div
                      style={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: '10%',
                      }}
                    >
                      <TextFieldCustom
                        label="lastName"
                        value={nowUser.lastName}
                        width="10"
                        height="10"
                        mainColor={companyData.themeColors.primary}
                      ></TextFieldCustom>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  {smallmatches ? (
                    <>
                      <h1
                        style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <ItemLabel
                          bgColor={companyData.themeColors.primary}
                          textColor={companyData.themeColors.secondary}
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
                    </>
                  ) : (
                    <div
                      style={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: '10%',
                      }}
                    >
                      <TextFieldCustom
                        label="email"
                        value={nowUser.email}
                        width="10"
                        height="10"
                        mainColor={companyData.themeColors.primary}
                      ></TextFieldCustom>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  {smallmatches && (
                    <>
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
                          textColor={companyData.themeColors.secondary}
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
                    </>
                  )}

                  <div
                    style={{
                      width: smallmatches ? '35%' : '80%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                      marginTop: '10px',
                    }}
                  >
                    <NativeSelect
                      defaultValue={nowUser.department?.name}
                      sx={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: 'rgb(245,245,245)',
                      }}
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
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                  height: '10%',
                }}
              >
                <ButtonComponent
                  customColor={companyData.themeColors.tertiary}
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

export default GeneralUserView;
