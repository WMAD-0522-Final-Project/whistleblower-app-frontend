import React, { useState } from 'react'
import { setCompanyData  } from '../../../RTK/companySlice';
import { selectCompanyData } from '../../../RTK/companySlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import pallete from '../Pallete'
import ListCustom from '../../../components/MUI_comp/ListItem';
const GeneralView = () => {
  const dispatch = useDispatch();
  const { companyData } = useSelector(selectCompanyData);
  const [companyName, setCompanyName] = useState(companyData.name)
  const [primaryColor, setPrimaryColor] = useState(companyData.themeColors.primary)
  const [secondaryColor, setSecondaryColor] = useState(companyData.themeColors.secondary)
    

  const submitChanges = () =>{
      dispatch(setCompanyData({...companyData, name: companyName, themeColors:{
        ...companyData.themeColors,
        primary: primaryColor,
        secondary: secondaryColor
      }}))
         // dispatch(setCompanyData({...companyData,
         //   themeColors: {...companyData.themeColors,
         //   primary: item.mainColor, 
         //   secondary: item.secondaryColor}}));
         console.log(companyData);
         
  }

  return (
    <div className='gv_cont'>
        <div className='gv_sub_cont'>
            <div className='gv_img_cont'>
                <div className='img_hover_edit'>
                    <p>Edit</p>
                </div>
                <img src={companyData.logo} alt="" />
            </div>
          

            <div className='gv_company_name'>
                <p style={{color: companyData.themeColors.primary}}>Company's Name</p>
                <input type="text" value={companyName} onChange={(e)=>{setCompanyName(e.target.value)}}/>
            </div>
        </div>

        <div className='gv_sub_cont gv_themeEditor'>
            <div className='gv_inputs'>
            <div className='th_inputSuperCont'> 
            <div className='th_inputSub'>
                <input type="color" id="color" name="color" value={primaryColor} onChange={(e)=>{setPrimaryColor(e.target.value)}}/>
                <p className='th_primaryColor_title'>Primary</p>
            </div>
            <input className='th_color_value' value={primaryColor.toUpperCase()} onChange={(e)=>{setPrimaryColor(e.target.value)}}></input>
            </div>
            <div className='th_inputSuperCont'> 
            <div className='th_inputSub'>
                <input type="color" id="color" name="color" value={secondaryColor} onChange={(e)=>{setSecondaryColor(e.target.value)}}/>
                <p className='th_primaryColor_title'>Secondary</p>
            </div>
            <input className='th_color_value' value={secondaryColor.toUpperCase()} onChange={(e)=>{setSecondaryColor(e.target.value)}}></input>
            </div>
            </div>
            <div className='gv_side_cont gv_pallete_super'>
            <div className='gv_pallete'>
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
                    // setColors({
                    //   mainColor: item.mainColor,
                    //   secondaryColor: item.secondaryColor,
                    // });
                  }}
                ></ListCustom>
              );
            })}
                </div>
            </div>
        </div>
        <div className='gv_submit_cont'>
            <button className='gv_button' onClick={submitChanges}>Apply Changes</button>
        </div>
    </div>
  )
}

export default GeneralView