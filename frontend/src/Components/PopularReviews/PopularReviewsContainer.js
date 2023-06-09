import React, { useEffect, useState } from 'react';
import PopularReviews from './PopularReviews';
import axios from "axios";
import config from '../../config'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

export default function PopularReviewsContainer(props) {

  const [reviews, getReviews] = useState('');
  useEffect(() => {
    getAllReviews()
  }, [])

  let allReviews = []

  const getAllReviews = () => {
    axios.get(
      config.api_url + '/get-all-reviews'
    )
    .then((response) => {
      const topReviews = getTopNReviews(response.data.reviews, props.n)
      getReviews(topReviews)
    })
  }

  function getTopNReviews(arr, n) {
    arr.sort((a, b) => b.id - a.id);
    return arr.slice(0, n);
  }
  
  const elements = [];
  for (let i = 0; i < 3; i++) {
      if (reviews[i] != null){
        elements.push(
          <Grid item xs={1}>
            <PopularReviews review={reviews[i]}/>
          </Grid>
          );
      }
      
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
      <span style={{ color: '#787878', fontSize: '17px' , fontWeight: 'bold', marginTop: '-10px', marginBottom: '10px', float: 'left' }}>Últimas avaliações</span>
      <Grid container rowSpacing={0} spacing={0} columns={1}>
        {elements}
      </Grid>
    </Box>
    
  );
  
  return 1
}
