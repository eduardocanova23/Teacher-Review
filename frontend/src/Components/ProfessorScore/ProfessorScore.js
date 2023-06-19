import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import GradeIcon from '@mui/icons-material/Grade';

import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ProfessorScore(props) {
  console.log(props.metrics)

  let data = [];

  if(props.metrics != null){
    data = [
      { name: '0', value: props.metrics[0] },
      { name: '2', value: props.metrics[2] },
      { name: '4', value: props.metrics[4] },
      { name: '6', value: props.metrics[6] },
      { name: '8', value: props.metrics[8] },
      { name: '10', value: props.metrics[10] }
    ];
  }
  
  let sum = data.reduce((total, item) => total + item.value * parseInt(item.name), 0);
  let weights = data.reduce((total, item) => total + item.value, 0);
  sum = (sum / weights).toFixed(1);
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 200,
          height: 117,
          padding: '10px',
          margin: '17px',
          backgroundColor: '#14181C',
          borderRadius: '17px',
          paddingTop: '5px'
        }}
      >
        <div style={{ marginBottom: '10px', marginTop: '-10px' }}>
          <p>
            <span style={{ color: '#99AABB', fontSize: '17px' }}>{props.name}</span>
          </p>
          <div style={{ borderBottom: '1px solid #99AABB', width: '100%', marginTop: '-10px' }}></div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <BarChart width={133} height={67} data={data}>
            <Bar dataKey="value" fill="#445566" />
          </BarChart>
          <GradeIcon style={{ color: '#99AABB', fontSize: '17px', marginLeft: '8px'  }} />
          <p style={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold', color: '#99AABB', marginLeft: '2px' }}>
            {sum}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
          
        </div>
      </Box>
    </>
  );
}