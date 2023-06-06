import './App.css';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Routes, Route } from 'react-router-dom';
import PermanentDrawerRight from './Components/LeftDrower';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeComponent from './Components/home';
import ProfComponent from './Components/Prof';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [page, setPage] = useState(<HomeComponent/>);
  console.log('page', page)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PermanentDrawerRight page = {page} setPage = {setPage}/>
        <Grid item mt={8}>
          <Item style = {{height : '90vh'}}> {page}</Item>
        </Grid>
    </Box>
    
  );
}

export default App;
