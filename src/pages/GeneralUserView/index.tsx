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
import { NativeSelect, TextField, useMediaQuery } from '@mui/material';
import ItemLabel from '../../components/ItemLabel';
import AdminUserViewCard from '../../components/admin/AdminUserViewCard';
import styles from './GeneralUserView.module.scss';
import GeneralUserViewCard from '../../components/admin/GeneralUserViewCard';
import Closebutton from '../../components/SVG/Closebutton';
import TextFieldCustom from '../../components/MUI_comp/TextFieldCustom';

function GeneralUserView() {
  const [text, setText] = useState('');

  const { companyData } = useSelector(selectCompanyData);
  const { context, setContext } = useAllContext();
  const [nowUser, setNowUser] = useState<Partial<adminUser> | null>(null);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const middlemaches = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallmatches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    if (context.GeneralUserId !== '') {
      const user = sampleUserDatas.filter(
        (user) => user._id === context.GeneralUserId
      )[0];
      setNowUser(user);
    }
  }, [context.GeneralUserId]);
  useEffect(() => {
    console.log(nowUser?.department, ';lkj');
  }, [nowUser?.department]);

  useEffect(() => {
    console.log('sm');
  }, [smallmatches]);
  const modifySubmit = () => {
    //submit nowUser with fetch
  };

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
                        url={user.avatarUrl}
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
                  user id : {nowUser.firstName}
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: '100%',
                  height: '70%',
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
                  {/* <div
                    style={{
                      width: '35%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight: '10%',
                    }}
                  >
                    <TextFieldCustom
                      label="firstName"
                      value={';lkj'}
                      width="10"
                      height="10"
                      mainColor={'blue'}
                    ></TextFieldCustom>
                  </div> */}
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

export default GeneralUserView;
