import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import TextFieldCustom from './TextFieldCustom';
import { selectCompanyData } from '../../RTK/companySlice'
import { setCompanyData  } from '../../RTK/companySlice';
import { useDispatch } from 'react-redux';

import './colorSettings/styleColor.scss';
import ListCustom from './ListItem';
import ColorInputs from './colorSettings/ColorInput';
import { useSelector } from 'react-redux';
import FileInput from '../FileInput';
import { auto } from '@popperjs/core';

const Settings = () => {
  const dispatch = useDispatch();

  const { companyData } = useSelector(selectCompanyData);
  const [colors, setColors] = useState({
    mainColor: '#000000',
    secondaryColor: '#2B2B2B',
  });
  const [palleteList, setPalleteList] = useState([
    { mainColor: '#C8E0F4', secondaryColor: '#BA1200' },
    { mainColor: '#BFB48F', secondaryColor: '#F2EFE9' },
    { mainColor: '#BC8DA7', secondaryColor: '#BDB4BF' },
    { mainColor: '#007991', secondaryColor: '#439A86' },
    { mainColor: '#2D2E2E', secondaryColor: '#716969' },
    { mainColor: '#242423', secondaryColor: '#F5CB5C' },
    { mainColor: '#BEB7A4', secondaryColor: '#929982' },
    { mainColor: '#8F857D', secondaryColor: '#F7F0F5' },
  ]);
  console.log(companyData);
  
  return (
    <div className="super" style={{width: '100%'}}>
      <div className="window" style={{ backgroundColor: '#FFFFFF' }}>
  
        <div className='company_img'>
        </div>
        <div className="inputFields">
          <div className="textInputs">
            <input className='field_input' type="text" />
            <input className='field_input' type="text" />
            <input className='field_input' type="text" />
            {/* <TextFieldCustom
              label="Name"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.secondary}
              textColor="black"
              required
            />
            <TextFieldCustom
              label="Name"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.secondary}
              textColor="black"
              required
            />
            <TextFieldCustom
              label="Name"
              error={false}
              width="80%"
              mainColor={companyData.themeColors.secondary}
              textColor="black"
              required
            /> */}
          </div>

          {/* <NestedList /> */}
          <div className="colorInputSelector">
            <ColorInputs
              value={companyData.themeColors.primary}
              onChange={(e: string) => {
                console.log(companyData);
                dispatch(setCompanyData({...companyData,
                themeColors: {...companyData.themeColors, primary: e}}));
                setColors({ ...colors, mainColor: e });
              }}
            />
            <ColorInputs
              value={companyData.themeColors.secondary}
              onChange={(e: string) => {
                dispatch(setCompanyData({...companyData,
                themeColors: {...companyData.themeColors, secondary: e}}));
                setColors({ ...colors, secondaryColor: e });
              }}
            />
          </div>
          <div className="colorPalletes">
            {palleteList.map((item, index) => {
              return (
                <ListCustom
                  key={index}
                  bgColor={`${true ? '#FFFFFF' : '#000000'}`}
                  height={40}
                  iconColorLeft={item.mainColor}
                  iconColorCenter={item.secondaryColor}
                  onClick={() => {
                    dispatch(setCompanyData({...companyData,
                      themeColors: {...companyData.themeColors,
                      primary: item.mainColor, 
                      secondary: item.secondaryColor}}));
                    setColors({
                      mainColor: item.mainColor,
                      secondaryColor: item.secondaryColor,
                    });
                  }}
                ></ListCustom>
              );
            })}
          </div>
        </div>
        {/* submit button */}


      </div>
 
    </div>
  );
};

export default Settings;
