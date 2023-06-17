import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import GradeIcon from '@mui/icons-material/Grade';

import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ProfessorScore() {
  const data = [
    { name: '0', value: 2 },
    { name: '2', value: 5 },
    { name: '4', value: 3 },
    { name: '6', value: 7 },
    { name: '8', value: 1 },
    { name: '10', value: 5 }
  ];

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
          width: 600,
          height: 350,
          padding: '20px',
          margin: '50px',
          backgroundColor: '#14181C',
          borderRadius: '50px'
        }}
      >
        <div style={{ marginBottom: '10px' }}> {/* Updated marginBottom */}
          <p>
            <span style={{ color: '#99AABB', fontSize: '50px' }}>Métrica 1</span>
          </p>
          <div style={{ borderBottom: '1px solid #99AABB', width: '100%' }}></div> {/* Added line */}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}> {/* Added display: 'flex' and alignItems: 'center' */}
          <BarChart width={400} height={200} data={data}>
            <Bar dataKey="value" fill="#445566" />
          </BarChart>
          <GradeIcon style={{ color: '#99AABB', fontSize: '50px', marginLeft: '25px'  }} />
          <p style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold', color: '#99AABB', marginLeft: '5px' }}>
            {sum}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}> {/* Added marginTop */}
          
        </div>
      </Box>
    </>
  );
}
