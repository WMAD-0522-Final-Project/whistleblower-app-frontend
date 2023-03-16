import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemButtonProps } from '@mui/material';

interface CustomListItemButtonProps extends ListItemButtonProps {
  // add any additional props you want to accept
  bgColor?: string;
  bgColorHover?: string;
  height?: number;
  iconColorRight?: string;
  iconColorLeft?: string;
  innerText?: string;
  innerTextColor?: string;
  customProp?: string;
}

const ListCustom = (props: CustomListItemButtonProps) => {
  const {
    customProp,
    bgColor,
    bgColorHover,
    height,
    iconColorRight,
    iconColorLeft,
    innerText,
    innerTextColor,
    ...rest
  } = props;

  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: `${bgColor}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    height: `${height}px`,
    '&:hover': {
      backgroundColor: `${bgColorHover}`,
    },
  }));

  const Container = styled('div')(({ theme }) => ({
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow:
      'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  }));

  const CustomDivRigth = styled('div')(({ theme }) => ({
    backgroundColor: `${iconColorRight}`,
    color: 'white',
    padding: '10px',
    borderRadius: '2px 0  0 2px',
    width: '50%',
  }));

  const CustomDivLeft = styled('div')(({ theme }) => ({
    backgroundColor: `${iconColorLeft}`,
    color: 'white',
    padding: '10px',
    borderRadius: '0 2px 2px 0 ',
    width: '50%',
  }));
  const InnerText = styled('p')(({ theme }) => ({
    color: `${innerTextColor}`,
  }));

  return (
    <CustomListItemButton {...rest}>
      <Container>
        <CustomDivRigth></CustomDivRigth>
        <CustomDivLeft></CustomDivLeft>
      </Container>

      <InnerText>{innerText}</InnerText>
      {/* add any custom content you want */}
      {props.children}
    </CustomListItemButton>
  );
};

export default ListCustom;
