import * as React from 'react';
import { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../RTK/companySlice';
const useLetterColor = () => {
  const [letterColor, setLetterColor] = useState('white');
  const { companyData } = useSelector(selectCompanyData);

  return { letterColor };
};
export default useLetterColor;
