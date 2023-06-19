import React, { useEffect, useState } from 'react';
import ProfessorSubject from './ProfessorSubject';
import axios from "axios";
import config from '../../config'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

export default function ProfessorSubjectContainer(props) {

  const [subjects, getSubjects] = useState('');
  useEffect(() => {
    getAllSubjects()
  }, [])

  const teacher_obj = {
    "id": props.id
  }

  const getAllSubjects = () => {
    axios.post(
      config.api_url + '/get-teacher-subjects',
      teacher_obj
    )
    .then((response) => {
      const allSubjects = response.data.subjects
      getSubjects(allSubjects)
    })
  }

  const elements = [];
  for (let i = 0; i < subjects.length; i++) {
      elements.push(
      <Grid item xs={1}>
        <ProfessorSubject subject={subjects[i]}/>
      </Grid>
      );
  }

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={5}>
        {elements}
      </Grid>
    </Box>
    
  );
}
