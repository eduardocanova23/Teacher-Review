import React, { useEffect, useState } from 'react';
import PopularReviews from './PopularReviews';
import axios from "axios";
import config from '../../config'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

export default function PopularReviewsContainer() {

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
      console.log(response.data.reviews)
      getReviews(response.data.reviews)
    })
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
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={5}>
        {elements}
      </Grid>
    </Box>
    
  );
  
  return 1
}
