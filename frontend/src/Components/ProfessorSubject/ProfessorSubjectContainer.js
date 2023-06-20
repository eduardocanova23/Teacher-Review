import React, { useEffect, useState } from 'react';
import ProfessorSubject from './ProfessorSubject';
import axios from "axios";
import config from '../../config'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import DescriptionMap from '../Professor/DescriptionMap'

export default function ProfessorSubjectContainer(props) {
  const [colorTech, setcolorTech] = useState([0,0]);
  const [subjects, getSubjects] = useState('');
  useEffect(() => {
    getAllSubjects()
  }, [])
  console.log(props)
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
        <ProfessorSubject subject={subjects[i]} i = {i}  colorTech = {colorTech} reviewList = {props.reviewList}/>
      </Grid>
      );
  }

  return (
    <>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      margin: '17px',
      backgroundColor: '#EEF2F5',
      borderRadius: '17px',
      paddingTop: '20px'
    }}>
      <span style={{ color: '#787878', fontSize: '17px' , fontWeight: 'bold', marginTop: '-10px', marginBottom: '10px', float: 'left' }}>Disciplinas</span>
      <Grid container spacing={2} columns={5} style={{justifyContent: 'left'}}>
        {elements}
      </Grid>
    </Box>

    <DescriptionMap reviewList ={props.reviewList}/>
    </>
  );
}
