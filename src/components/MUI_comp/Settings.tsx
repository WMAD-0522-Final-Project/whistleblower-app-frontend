import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import TextFieldCustom from './TextFieldCustom'

import './colorSettings/styleColor.scss'
import ListCustom from './ListItem'
import ColorInputs from './colorSettings/ColorInput'

const Settings = () => {
  const [colors, setColors] = useState({
    mainColor: '#000000', secondaryColor: '#2B2B2B' 
  })
  const [palleteList, setPalleteList] =  useState([
    { mainColor: '#C8E0F4', secondaryColor: '#BA1200'},
    { mainColor: '#BFB48F', secondaryColor: '#F2EFE9'},
    { mainColor: '#BC8DA7', secondaryColor: '#BDB4BF'},
    { mainColor: '#007991', secondaryColor: '#439A86'},
    { mainColor: '#2D2E2E', secondaryColor: '#716969'},
    { mainColor: '#242423', secondaryColor: '#F5CB5C'},
    { mainColor: '#BEB7A4', secondaryColor: '#FFFFFC'},
    { mainColor: '#8F857D', secondaryColor: '#F7F0F5'}
  ])
  return (
    <div className='super' style={{backgroundColor: `${colors.mainColor}`}}>
        <div className='window' style={{backgroundColor: '#FFFFFF'}}>
            <p style={{color: `${colors.mainColor}`}} className='setting_title'>Settings</p>
            <div className='inputFields'>
              <div className='textInputs'>
                <TextFieldCustom label="Name"
                  error={false}
                  width="80%" 
                  mainColor={colors.secondaryColor}
                  textColor="black"
                  required /> 
                <TextFieldCustom label="Name"
                  error={false}
                  width="80%" 
                  mainColor={colors.secondaryColor}
                  textColor="black"
                  required />     
                <TextFieldCustom label="Name"
                  error={false}
                  width="80%" 
                  mainColor={colors.secondaryColor}
                  textColor="black"
                  required /> 
              </div>
             
                {/* <NestedList /> */}
              <div className='colorInputSelector' >
              <ColorInputs value={colors.mainColor} onChange={(e: string)=>{
                  setColors({...colors, mainColor: e})                  
                  }}/>
              <ColorInputs value={colors.secondaryColor}  onChange={(e: string)=>{
                  setColors({...colors, secondaryColor: e})                  
                  }}/>
            </div>
                <div className='colorPalletes'>
                {palleteList.map((item, index) =>{
                  return (
                    <ListCustom  
                    key={index}
                    bgColor={`${true? '#FFFFFF':'#000000'}`}
                    height={40}
                    iconColorLeft={item.mainColor}
                    iconColorCenter={item.secondaryColor}
                    onClick={()=>{
                      setColors({mainColor: item.mainColor,secondaryColor: item.secondaryColor})
                    }}></ListCustom>
                    )
            })}   
                </div>
            </div>
            <ButtonComponent onClick={()=>{}}
             variant="contained"
             customColor={colors.secondaryColor}
             width="20rem"
             height="2rem">
                Submit
            </ButtonComponent> {/* submit button */}
        </div>
        <div className='bg_decoration' style={{backgroundImage: 'radial-gradient(circle, ' +`${colors.secondaryColor}`+' 20%, transparent 10%), radial-gradient(circle, ' +`${colors.secondaryColor}`+', 20%, transparent 10%)'}}>
             
        </div>

    </div>
  )
}

export default Settings