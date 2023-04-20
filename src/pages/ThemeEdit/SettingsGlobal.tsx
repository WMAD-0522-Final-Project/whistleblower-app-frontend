import React, { useEffect, useState } from 'react'
import './styles.css'
import GeneralView from './Components/GeneralView'
import Departments from './Components/Departments'
import { setCompanyData  } from '../../RTK/companySlice';
import { selectCompanyData } from '../../RTK/companySlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const SettingsGlobal = () => {
  const dispatch = useDispatch();
  const { companyData } = useSelector(selectCompanyData);


  const [option, setOption] = useState(1)

  

  const showTab = () => {
    switch (option) {
        case 1: 
            return <GeneralView/>
        case 2: 
            return <Departments/>
    }
  }

  return (
    <div className='global'>
        <div className='content left_nav'>
            <p onClick={()=>{setOption(1)}} style={(option === 1)? {borderBottom: `2px solid ${companyData.themeColors.primary}`}: {}}>General View</p>
            <p onClick={()=>{setOption(2)}} style={(option === 2)? {borderBottom: `2px solid ${companyData.themeColors.primary}`}: {}}>Departments</p>
        </div>
        <div className='content rigth_options'>
            {showTab()}
        </div>
    </div>
  )
}

export default SettingsGlobal