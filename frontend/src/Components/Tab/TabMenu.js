
import React, { useState, useEffect } from 'react';
//MUI components
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import HomeComponent from '../../Pages/home';
import ProfComponent from '../../Pages/Prof';

export default function MenuListComposition({page, setPage}) {

  return (

    <Stack   direction="column"
    justifyContent="space-between"
    alignItems="center"
    spacing={4}>
        <MenuList style={{width: '100%'}}>
          <MenuItem style={{paddingBottom: '10px'}} onClick={() => setPage(<HomeComponent/>)}>Página principal</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}} onClick={() =>setPage(<ProfComponent/>)}>Avaliação</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}}>Dashboard</MenuItem>
          <MenuItem style={{paddingBottom: '10px'}}>Adicionar Avaliação</MenuItem>
        </MenuList>
      
        
    </Stack>
  );
}