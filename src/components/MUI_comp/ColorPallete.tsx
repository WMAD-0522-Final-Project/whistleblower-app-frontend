import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ListCustom from './ListItem';

import { styled } from '@mui/material/styles';


export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FormatColorFillIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListCustom
          bgColor='green'
          bgColorHover='blue'
          height={40}
          iconColorLeft='white'
          iconColorRight='black'
          innerText='setColor'
          onClick={()=>{console.log('clicked');
          }}

          ></ListCustom>
          <ListCustom></ListCustom> 
      
          {/*We Can add as much Listem Custom as we want with any coulors */}
          
        </List>
      </Collapse>
    </List>
  );
}