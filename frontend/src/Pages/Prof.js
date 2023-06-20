import React, { useState, useEffect } from 'react';
import DescriptionMap from '../Components/Professor/DescriptionMap'
import {useDescription} from '../Components/Professor/hooks/useDescription'
import Box from '@mui/material/Box';

import ProfessorSubjectContainer from '../Components/ProfessorSubject/ProfessorSubjectContainer'

export default function ProfComponent() {
  const id = 1;
  const {reviewList, handleReviewList} = useDescription();

  useEffect(() => {
    handleReviewList(id);
  }, []);
  
  return (
    <Box>
      <ProfessorSubjectContainer id = {id} reviewList = {reviewList}/>

    </Box>
  );
}