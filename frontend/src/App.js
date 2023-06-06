import './App.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import PermanentDrawerRight from './Components/LeftDrower';

import HomeComponent from './Components/home';
import ProfComponent from './Components/Prof';

function App() {
  const [page, setPage] = useState(<HomeComponent/>);
  console.log('page', page)
  return (
    <Box>
      <PermanentDrawerRight page = {page} setPage = {setPage}/>
    {page}
    </Box>
    
  );
}

export default App;
