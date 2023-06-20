
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import PermanentDrawerRight from './Components/Tab/LeftDrower'
import './css/App.css';
import Form from './Pages/Form'
import HomeComponent from './Pages/home'
import ProfComponent from './Pages/Prof'
import ProfessorScoreContainer from './Components/ProfessorScore/ProfessorScoreContainer';
import ProfessorSubjectContainer from './Components/ProfessorSubject/ProfessorSubjectContainer';
import PopularReviewsContainer from './Components/PopularReviews/PopularReviewsContainer';

// import FeaturedComponent from './components/FeaturedComponent'
function App() {
  const [page, setPage] = useState(<HomeComponent/>);

  return (
    <Box> 
      <PermanentDrawerRight page = {page} setPage = {setPage}/>
    <div className="App">
      {page}

    </div>
    
    </Box>
  );
}

export default App;
