import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ListCustom from '../ListItem';
import { styled } from '@mui/material/styles';

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px',
});
interface Props {
  setPalette: (newValue: {
    mainColor: string;
    secondaryColor: string;
    day: boolean;
  }) => void;
}
export default function NestedList({ setPalette }: Props) {
  const [open, setOpen] = React.useState(true);
  const [palleteList, setPalleteList] = useState([
    { mainColor: '#C8E0F4', secondaryColor: '#BA1200', day: true },
    { mainColor: '#BFB48F', secondaryColor: '#F2EFE9', day: true },
    { mainColor: '#BC8DA7', secondaryColor: '#BDB4BF', day: true },
    { mainColor: '#007991', secondaryColor: '#439A86', day: true },
    { mainColor: '#2D2E2E', secondaryColor: '#716969', day: true },
    { mainColor: '#242423', secondaryColor: '#F5CB5C', day: false },
    { mainColor: '#BEB7A4', secondaryColor: '#FFFFFC', day: false },
    { mainColor: '#8F857D', secondaryColor: '#F7F0F5', day: false },
  ]);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: '320px', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FormatColorFillIcon />
        </ListItemIcon>
        <ListItemText primary="Palettes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <GridContainer>
          {palleteList.map((item, index) => {
            return (
              <ListCustom
                key={index}
                bgColor="white"
                height={40}
                iconColorLeft={item.mainColor}
                iconColorCenter={item.secondaryColor}
                iconColorRight={item.day ? '#FFFFFF' : '#000000'}
                onClick={() => {
                  console.log(setPalette(item));
                }}
              ></ListCustom>
            );
          })}
        </GridContainer>
      </Collapse>
    </List>
  );
}
