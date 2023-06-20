import React, { useState, useEffect } from 'react';

//MUI components
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import DescriptionComponent from './Description'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:  '#EEF2F5',
  padding: theme.spacing(4),
}));
export default function DescriptionMap({reviewList}) {

  return (
    <><Item style={{  maxHeight: '400px',
    overflow: 'auto'}}>
      {reviewList.length > 0 && reviewList.map((review) => 
          
            <DescriptionComponent description = {review.description} materia = {review.name} date = {review.date}/>
          
      )}</Item>
    </>
  );
}