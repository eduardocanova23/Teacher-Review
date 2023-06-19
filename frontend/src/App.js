
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import PermanentDrawerRight from './Components/Tab/LeftDrower'
import './css/App.css';
import ReviewForm from './Components/Form/ReviewForm'
import HomeComponent from './Pages/home'
import ProfComponent from './Pages/Prof'
import ProfessorScoreContainer from './Components/ProfessorScore/ProfessorScoreContainer';
import ProfessorSubjectContainer from './Components/ProfessorSubject/ProfessorSubjectContainer';
import PopularReviewsContainer from './Components/PopularReviews/PopularReviewsContainer';

function App() {
  const [page, setPage] = useState(<HomeComponent/>);

  const data = [1, 2, 3, 4, 8, 6]; 

  return (
    <Box> 
    <div className="App">
      <PopularReviewsContainer id={1892}/>
    </div>
    
    </Box>
  );
}

export default App;
