import React, { useState, useEffect } from 'react';
import DescriptionMap from './DescriptionMap'
import Box from '@mui/material/Box';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ProfessorSubjectContainer from '../ProfessorSubject/ProfessorSubjectContainer'
import ProfessorScoreContainer from '../ProfessorScore/ProfessorScoreContainer'

import {useParams} from "react-router-dom"
import { useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {useDescription} from './hooks/useDescription'
function ProfessorDetail() {
    const {professorId} = useParams()
    let navigate = useNavigate();

    const {reviewList, handleReviewList} = useDescription();
    // let navigate = useNavigate();
  
    useEffect(() => {
      handleReviewList(professorId);
    }, []);
    
    return (
        <Box>
        <div>
            <div style={{position:'absolute', margin: 20}}>
                <IconButton onClick={() => navigate(-1)} aria-label="delete" size="small">
                <ArrowBack fontSize="small" />
                Voltar
                </IconButton>
            </div>
            <ProfessorScoreContainer id = {professorId} />
            <ProfessorSubjectContainer id = {professorId} reviewList = {reviewList}/>
        </div>
        </Box>
    )
}

export default ProfessorDetail
