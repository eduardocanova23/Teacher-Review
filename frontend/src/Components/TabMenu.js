import * as React from 'react';

//MUI components
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from './home';
import ProfComponent from './Prof';

export default function MenuListComposition({page, setPage}) {

  return (

    <Stack   direction="column"
    justifyContent="space-between"
    alignItems="center"
    spacing={4}>
        <MenuList style={{width: '100%', marginLeft: '10px'}}>
          <MenuItem style={{paddingBottom: '10px'}} onClick={() => setPage(<HomeComponent/>)}>Página principal</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}} onClick={() =>setPage(<ProfComponent/>)}>Avaliação</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}}>Dashboard</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}}>Adicionar Avaliação</MenuItem>
        </MenuList>
      
        
    </Stack>
  );
}