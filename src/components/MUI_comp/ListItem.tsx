import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemButtonProps } from '@mui/material';

interface CustomListItemButtonProps extends ListItemButtonProps {
  // add any additional props you want to accept
  bgColor?: string;
  bgColorHover?: string;
  height?: number;
  iconColorRight?: string;
  iconColorCenter?: string;
  iconColorLeft?: string;
  innerTextColor?: string;
  boxShadowColor?: boolean;
  customProp?: string;
  
}



const ListCustom = (props: CustomListItemButtonProps) => {



  const { 
    customProp,
    bgColor,
    bgColorHover,
    height,
    iconColorRight,
    iconColorCenter,
    iconColorLeft,
    innerTextColor,
    boxShadowColor,
     ...rest } = props;

  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: `transparent`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    height: `100%`,
    boxShadow: " rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px"
  }));

  
  const CustomDivLeft = styled('div')(({ theme }) => ({
    backgroundColor: `${iconColorLeft}`,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    width: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'

  }));
  const CustomDivCenter = styled('div')(({ theme }) => ({
    backgroundColor: `${iconColorCenter}`,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    width: '10px',
    marginLeft: '3px',
    marginRight: '3px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
  }));


  return (
    <CustomListItemButton {...rest}>
          <CustomDivLeft></CustomDivLeft>
          <CustomDivCenter></CustomDivCenter>
      {props.children}
    </CustomListItemButton>
  );
};

export default ListCustom;