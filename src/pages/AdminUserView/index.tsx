import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import CustomBox from '../../components/CustomBox/CustomBox';
import SearchBox from '../../components/SearchBox';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import sampleUserDatas from '../../temp/sampleUserDatas';
import { useAllContext } from '../../custom/ClaimIdContext';
import { adminUser } from '../../types';
import RoleToggles from '../../components/admin/RoleToggles';
import { NativeSelect } from '@mui/material';
import ItemLabel from '../../components/ItemLabel';
import UserViewCard from '../../components/admin/AdminUserViewCard';
import styles from './AdminUserView.module.scss';

function AdminUserView() {
  const [text, setText] = useState('');

  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const [nowUser, setNowUser] = useState<Partial<adminUser> | null>(null);
  // useEffect(() => {
  //   if (claimId !== '') {
  //     const firstName = claimId?.split(' ')[0];
  //     const user = sampleUserDatas.filter(
  //       (user) => user.firstName === firstName
  //     )[0];
  //     setNowUser(user);
  //   }
  // }, [claimId]);
  useEffect(() => {
    console.log(nowUser?.department, ';lkj');
  }, [nowUser?.department]);

  const modifySubmit = () => {
    //submit nowUser with fetch
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          marginTop: '1%',
          width: '100vw',
        }}
      >
        <CustomBox sx={{ height: '90%', width: '40%' }}>
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
              overflow: 'scroll',
              marginTop: '6%',
            }}
            className={styles.box}
          >
            {sampleUserDatas
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
                      marginTop: `${20 * i}%`,
                      display: 'flex',
                      justifyContent: 'center',
                      top: 10,
                    }}
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

        {nowUser && (
          <CustomBox
            // animate={claimId !== '' ? { display: 'inline-block' } : {}}
            sx={{
              width: '40%',
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  user setting : {nowUser.firstName}
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
                          <option value={dep.name}>{`${dep.name}`}</option>
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
                      textColor={companyData.themeColors.secondary}
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
                }}
              >
                <button
                  onClick={modifySubmit}
                  style={{
                    backgroundColor: companyData.themeColors.tertiary,
                    border: 'none',
                    padding: '15px',
                    borderRadius: '10px',
                    fontSize: '1.2rem',
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </CustomBox>
        )}
      </div>
    </>
  );
}

export default AdminUserView;
