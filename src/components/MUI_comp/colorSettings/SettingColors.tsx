import React, { useState } from 'react'
import ButtonComponent from '../ButtonComponent'
import ColorInput from './ColorInput'
import NestedList from './ColorPallete'
import './ColorSettings.css'
import ListCustom from '../ListItem'


const SettingColors = () => {


  const [palette, setPalette] = useState({
    mainColor: '#000000',
    secondaryColor: '#FFFFFF',
    day: true
  })



  return (
  <div className='super'>
    <div className='container'>
        <p>Color Settings</p>
        <div className='subContainer sub_1'>
            <div className='colors'>
                 <p>Main Color</p>
                <ColorInput value={palette.mainColor} onChange={(e: string)=>{
                  setPalette({...palette, mainColor: e})                  
                  }}/>
            </div>
            <div className='colors'>
                 <p>Secondary Color</p>
                <ColorInput value={palette.secondaryColor} onChange={(e: string)=>{
                  setPalette({...palette, secondaryColor: e})                  
                  }}/>
            </div>
        </div>
        <div className='subContainer sub_2'>

          <p>Complementary Color</p>
            <ButtonComponent 
            
              variant="contained"
              customColor={palette.day? "white":"black"}
              width="5rem"
              height="2rem"
              textColor={palette.day? "black":"white"}
              onClick={()=>{setPalette({...palette, day: !palette.day})}}
              >
              {palette.day? "white":"black"}
            </ButtonComponent>

        </div>
        <div className='subContainer sub_3'>
            <p>Predefined Palletes</p>
            <NestedList setPalette={setPalette}/>

        </div>
        <ButtonComponent 
            
            variant="contained"
            customColor="orange"
            width="auto"
            height="2rem"
            textColor="white"
            onClick={()=>{}}
            >
            Save Changes
          </ButtonComponent>

    </div>
      <div className='container'>
          <div className='background' style={{backgroundColor: `${palette.mainColor}`}}>
          <div className='suple' style={{backgroundColor: `${palette.secondaryColor}`}}></div>
            <div className='window' style={ palette.day? {backgroundColor: '#FFFFFF'}:{backgroundColor: '#000000'}}>
              <p style={ palette.day? {color: '#000000'}:{color: '#FFFFFF'}}>Lorem ipsum dolor sit
              </p>
            </div>
          </div>
      </div>
    </div>
      
  )
}

export default SettingColors