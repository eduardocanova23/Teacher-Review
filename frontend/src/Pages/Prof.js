import React, { useState, useEffect } from 'react';
import DescriptionMap from '../Components/Professor/DescriptionMap'
import {useDescription} from '../Components/Professor/hooks/useDescription'
import Box from '@mui/material/Box';
// import {useParams} from "react-router-dom"
// import {useNavigate} from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ProfessorSubjectContainer from '../Components/ProfessorSubject/ProfessorSubjectContainer'
import ProfessorScoreContainer from '../Components/ProfessorScore/ProfessorScoreContainer'
export default function ProfComponent() {
  const id = 1;
  const {reviewList, handleReviewList} = useDescription();
  // let navigate = useNavigate();

  useEffect(() => {
    handleReviewList(id);
  }, []);
  
  return (
    <Box>
{/* <IconButton onClick={() => navigate(-1)} aria-label="delete" size="small">
                <ArrowBack fontSize="small" />
                Voltar
                </IconButton>
<div style={{position:'absolute', margin: 20}}>
                <IconButton onClick={() => navigate(-1)} aria-label="delete" size="small">
                <ArrowBack fontSize="small" />
                Voltar
                </IconButton>
            </div> */}
      <ProfessorScoreContainer id = {id} />
      <ProfessorSubjectContainer id = {id} reviewList = {reviewList}/>
    </Box>
  );
}