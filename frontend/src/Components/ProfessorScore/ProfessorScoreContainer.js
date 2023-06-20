import React, { useEffect, useState } from 'react';
import ProfessorScore from './ProfessorScore';
import axios from "axios";
import config from '../../config'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

export default function ProfessorScoreContainer(props) {

  const [metrics, getMetrics] = useState('');
  
  useEffect(() => {
    getAllReviews()
  }, [])

  const review_obj = {
    "id": props.id
  }

  let allReviews = []

  const getAllReviews = () => {
    axios.post(
      config.api_url + '/get-teacher-reviews',
      review_obj
    )
    .then((response) => {
      allReviews = response.data.reviews
      countMetrics()
    })
  }

  const countMetrics = () => {
    var allMetrics = [
      {0:0, 2:0, 4:0, 6:0, 8:0, 10:0},
      {0:0, 2:0, 4:0, 6:0, 8:0, 10:0},
      {0:0, 2:0, 4:0, 6:0, 8:0, 10:0},
      {0:0, 2:0, 4:0, 6:0, 8:0, 10:0},
      {0:0, 2:0, 4:0, 6:0, 8:0, 10:0}
    ] 

    for (let review of allReviews) {
      allMetrics[0][review.metric1]++
      allMetrics[1][review.metric2]++
      allMetrics[2][review.metric3]++
      allMetrics[3][review.metric4]++
      allMetrics[4][review.metric5]++
    } 
    getMetrics(allMetrics)
  }

  return (
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
      <span style={{ color: '#787878', fontSize: '17px' , fontWeight: 'bold', marginTop: '-10px', marginBottom: '10px', float: 'left' }}>Métricas de avaliação</span>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>
          <ProfessorScore metrics={metrics[0]} name={'Didática'}/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore metrics={metrics[1]} name={'Organização'}/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore metrics={metrics[2]} name={'Empatia'}/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore metrics={metrics[3]} name={'Pontualidade'}/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore metrics={metrics[4]} name={'Mamata'}/>
        </Grid>
      </Grid>
    </Box>
  );
}
