import React, { useState, useEffect } from 'react';
import { setCompanyData } from '../../../RTK/companySlice';
import { selectCompanyData } from '../../../RTK/companySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
//MUI
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
//Axios
import axios, { AxiosResponse } from 'axios';

import '../styles/style_departments.css';
import getAuthorizationValue from '../../../helpers/getAuthorizationValue';
import useLetterColor from '../../../hooks/useLetterColor';

const Departments = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [newDep, setNewDep] = useState(false);
  const [addedDep, setAddedDep] = useState('');
  const { companyData } = useSelector(selectCompanyData);

  const { letterColor } = useLetterColor();

  useEffect(() => {
    console.log(companyData);
  }, [companyData.departments]);

  const changeDeptName = (id: string, newName: string) => {
    const departments = companyData.departments.filter((dept) => {
      return dept._id !== id;
    });
    dispatch(
      setCompanyData({
        ...companyData,
        departments: [{ _id: id, name: newName }, ...departments],
      })
    );
  };

  const deleteDepartment = (id: string) => {
    const departments = companyData.departments.filter((dept) => {
      return dept._id !== id;
    });
    dispatch(setCompanyData({ ...companyData, departments: departments }));
  };

  const sendDepartments = () => {
    axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/company/department/update`,
      headers: { Authorization: getAuthorizationValue() },
      data: {
        departments: companyData.departments.map((dep) => {
          return { name: dep.name };
        }),
      },
    });
  };

  return (
    <div className="departments_super">
      <div className="upper_departments">
        <input
          type="text"
          placeholder="Search Department..."
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <motion.button
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 1.2, transition: { duration: 0 } }}
          style={{ backgroundColor: companyData.themeColors.primary }}
          className="button_addNewDepartment"
          onClick={() => {
            setNewDep(true);
          }}
        >
          <AddIcon style={{ color: letterColor }} className="icon" />
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="departments_container"
      >
        {newDep ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="depatments_depart"
          >
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setAddedDep(e.target.value);
              }}
            />
            <div>
              <div className="add_buttonsCont">
                <button
                  className="button_addDepartment"
                  onClick={() => {
                    if (addedDep === '') {
                      setNewDep(false);
                      setAddedDep('');
                    } else {
                      setNewDep(false);
                      setAddedDep('');

                      dispatch(
                        setCompanyData({
                          ...companyData,
                          departments: [
                            { _id: Date.now().toString(), name: addedDep },
                            ...companyData.departments,
                          ],
                        })
                      );
                    }
                  }}
                >
                  <AddIcon className="icon" />
                </button>
                <button
                  className="button_deleteDepartment button_cancelDepartment"
                  onClick={() => {
                    setAddedDep('');
                    setNewDep(false);
                  }}
                >
                  <ClearIcon className="icon" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <></>
        )}

        {companyData.departments
          .filter((department) => {
            return filter.toLowerCase() === ''
              ? department
              : department.name.toLowerCase().includes(filter);
          })
          .map((department) => {
            return (
              <div className="depatments_depart" key={department._id}>
                <input
                  type="text"
                  value={department.name}
                  onChange={(e) => {
                    changeDeptName(department._id, e.target.value);
                  }}
                />
                <button
                  className="button_deleteDepartment"
                  onClick={() => {
                    console.log(deleteDepartment(department._id));
                  }}
                >
                  <ClearIcon className="icon" />
                </button>
              </div>
            );
          })}
      </motion.div>
      <button
        onClick={() => {
          sendDepartments();
        }}
        className="button_seveDept"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Departments;
