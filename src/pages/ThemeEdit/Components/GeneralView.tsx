import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { setCompanyData } from '../../../RTK/companySlice';
import { selectCompanyData } from '../../../RTK/companySlice';
import pallete from '../Pallete';
import ListCustom from '../../../components/MUI_comp/ListItem';

import axios, { AxiosResponse } from 'axios';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';
import { CompanyDataTypes } from '../../../types';
import { useQuery } from '@tanstack/react-query';

const GeneralView = () => {
  const dispatch = useDispatch();
  const { companyData } = useSelector(selectCompanyData);
  const [companyName, setCompanyName] = useState(companyData.name);
  const [primaryColor, setPrimaryColor] = useState(
    companyData.themeColors.primary
  );
  const [secondaryColor, setSecondaryColor] = useState(
    companyData.themeColors.secondary
  );
  const [companyImgChanging, setCompanyImgChanging] = useState('');

  useEffect(() => {
    setCompanyName(companyData.name);
    setPrimaryColor(companyData.themeColors.primary);
    setSecondaryColor(companyData.themeColors.secondary);
  }, [companyData]);

  const submitChanges = () => {
    dispatch(
      setCompanyData({
        ...companyData,
        name: companyName,
        themeColors: {
          ...companyData.themeColors,
          primary: primaryColor,
          secondary: secondaryColor,
        },
      })
    );
  };
  useEffect(() => {
    newCompanyData();
  }, [companyData]);

  const login = (data: {
    name: string;
    themeColors: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
  }): Promise<void> => {
    return axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/company/info/update`,
      headers: { Authorization: getAuthorizationValue() },
      data,
    });
  };

  async function newCompanyData() {
    try {
      const userCredentials = {
        name: companyData.name,
        themeColors: {
          primary: companyData.themeColors.primary,
          secondary: companyData.themeColors.secondary,
          tertiary: companyData.themeColors.tertiary,
        },
      };

      await login(userCredentials);
    } catch (error) {
      console.error(error);
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    const formdata = new FormData();

    if (selectedFile) {
      formdata.append('companyLogo', selectedFile);
      axios({
        method: 'PUT',
        url: `${import.meta.env.VITE_BACKEND_URL}/api/company/logo/update`,
        headers: {
          Authorization: getAuthorizationValue(),
          contentType: 'multipart/form-data',
        },
        data: formdata,
      });
    }
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCompanyImgChanging(reader.result as string);
      };
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="gv_cont">
      <div className="gv_sub_cont">
        <div className="gv_file-upload">
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={handleButtonClick}>
            <div className="gv_img_cont">
              <div className="img_hover_edit">
                <p>Edit</p>
              </div>
              <img
                src={
                  companyImgChanging.length > 0
                    ? companyImgChanging
                    : companyData.logoImg
                }
                alt=""
              />
            </div>
          </button>
        </div>

        <div className="gv_company_name">
          <p style={{ color: companyData.themeColors.primary }}>
            Company's Name
          </p>
          <input
            type="text"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="gv_sub_cont gv_themeEditor">
        <div className="gv_inputs">
          <div className="th_inputSuperCont">
            <div className="th_inputSub">
              <input
                type="color"
                id="color"
                name="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                }}
              />
              <p className="th_primaryColor_title">Primary</p>
            </div>
            <input
              className="th_color_value"
              value={primaryColor.toUpperCase()}
              onChange={(e) => {
                setPrimaryColor(e.target.value);
              }}
            ></input>
          </div>
          <div className="th_inputSuperCont">
            <div className="th_inputSub">
              <input
                type="color"
                id="color"
                name="color"
                value={secondaryColor}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                }}
              />
              <p className="th_primaryColor_title">Secondary</p>
            </div>
            <input
              className="th_color_value"
              value={secondaryColor.toUpperCase()}
              onChange={(e) => {
                setSecondaryColor(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="gv_side_cont gv_pallete_super">
          <div className="gv_pallete">
            {pallete.map((item, index) => {
              return (
                <ListCustom
                  key={index}
                  bgColor={`${true ? '#FFFFFF' : '#000000'}`}
                  height={40}
                  iconColorLeft={item.mainColor}
                  iconColorCenter={item.secondaryColor}
                  onClick={() => {
                    setPrimaryColor(item.mainColor);
                    setSecondaryColor(item.secondaryColor);
                  }}
                ></ListCustom>
              );
            })}
          </div>
        </div>
      </div>
      <div className="gv_submit_cont">
        <button
          className="gv_button"
          onClick={() => {
            submitChanges();
          }}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default GeneralView;
