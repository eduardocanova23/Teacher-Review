
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import PermanentDrawerRight from './Components/Tab/LeftDrower'
import './css/App.css';
import ReviewForm from './Components/Form/ReviewForm'
import HomeComponent from './Pages/home'
import ProfComponent from './Pages/Prof'

function App() {
  const [page, setPage] = useState(<HomeComponent/>);
  return (
    <Box>
      <PermanentDrawerRight page = {page} setPage = {setPage}/>
    <div className="App">
      {/* <ReviewForm/>  */}
      {page}
    </div>
    
    </Box>
  );
}

export default App;
