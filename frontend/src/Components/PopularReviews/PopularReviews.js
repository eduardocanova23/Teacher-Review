import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PopularReviews(props) {

  const getStars = (metric) => {
    const elements = [];
    if (props.review != null) {
      for (let i = 0; i < metric/2; i++) {
        elements.push(
          <GradeIcon style={{ color: '#282828', fontSize: '17px', marginLeft: '8px'  }} />
          ); 
      }
    }
    if (props.review != null) {
      for (let i = 0; i < 5 - metric/2; i++) {
        elements.push(
          <GradeOutlinedIcon style={{ color: '#282828', fontSize: '17px', marginLeft: '8px'  }} />
          ); 
      }
    }
    return elements
  }
  

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          width: 700,
          padding: '10px',
          margin: '17px',
          backgroundColor: '#FFFFFF',
          borderRadius: '17px',
          paddingTop: '5px'
        }}
      >
        <span style={{ color: '#282828', fontSize: '13px'}}>{(props.review != null) ? props.review.professor_name : ''} - {(props.review != null) ? props.review.subject_name : ''}</span>
        <p>
          <span style={{ color: '#282828', fontSize: '17px'}}>{(props.review != null) ? props.review.description : ''}</span>
        </p>
        <div style={{ borderBottom: '4px solid #40A737', width: '100%', marginTop: '-10px' }}></div>
        <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>Didática: {(props.review != null) ? getStars(props.review.metric1) : ''}</span>
        <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>Organização: {(props.review != null) ? getStars(props.review.metric2) : ''}</span>
        <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>Empatia: {(props.review != null) ? getStars(props.review.metric3) : ''}</span>
        <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>Pontualidade: {(props.review != null) ? getStars(props.review.metric4) : ''}</span>
        <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>Mamata: {(props.review != null) ? getStars(props.review.metric5) : ''}</span>
      </Box>
    </>
  );
}
