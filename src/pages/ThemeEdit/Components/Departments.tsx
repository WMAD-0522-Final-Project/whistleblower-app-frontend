import React, { useState, useEffect } from 'react'
import { setCompanyData } from '../../../RTK/companySlice';
import { selectCompanyData } from '../../../RTK/companySlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";

import '../style_departments.scss'

import dummyData from './depJson.json'

const Departments = () => {
const dispatch = useDispatch();
const [filter, setFilter] = useState('')
const [departments, setDepartments] = useState(dummyData.company.departments)
const [newDep, setNewDep] = useState(false)
const [addedDep, setAddedDep] = useState('')
const { companyData } = useSelector(selectCompanyData);



  return (
    <div className='departments_super'>
      <div className='upper_departments'>
        <input type="text" onChange={(e)=>{setFilter(e.target.value)}}/>
        <button onClick={()=>{setNewDep(true)}}>Add new department</button>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      className='departments_container'>

        {newDep?
          <motion.div
          key="table"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='depatments_depart'>
             <input type="text" name="" id="" onChange={(e)=>{
              setAddedDep(e.target.value)
             }}/>
             <div>
              <button onClick={()=>{
              setNewDep(false)
                setDepartments([ {_id: 'qqq', name: addedDep}, ...departments])
              }}>
              Add</button>
              <button onClick={()=>{
                setAddedDep('')
                setNewDep(false)}}>Cancel</button>
             </div>
          </motion.div>
        :
          <></>
        }
      
        {departments.filter((department)=>{
          return filter.toLowerCase() === ''? 
          department : department.name.toLowerCase().includes(filter)
        })
        .map(department =>{
          return (
          <div className='depatments_depart' key={department._id}>
            <p>{department.name}</p>
            <button>Delete</button>
          </div>
          )
        })}
      </motion.div>
      <button>sss</button>
    </div>
  )
}

export default Departments