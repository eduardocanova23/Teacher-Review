import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';


export default function ProfessorSubject(props) {
  const [teachColor, setTeachColor] = useState('');
  const color = ['4px solid #FF2473','4px solid #FEA946', '4px solid #40A737' , '4px solid #00569E', '4px solid #18B0FF', '4px solid #6A6A6A', '4px solid #8a0606', '4px solid #067f8a']
  useEffect(() => {
    setTeachColor(color[props.subject.teach_id% color.length])
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          padding: '10px',
          margin: '17px',
          backgroundColor: '#FFFFFF',
          borderRadius: '17px',
          paddingTop: '5px'
        }}
      >
        <div style={{ marginBottom: '10px', marginTop: '-2px'}}>
          <p>
            <span style={{ color: '#282828', fontSize: '17px', fontWeight: 'bold'}}>{(props.subject != null) ? props.subject.name : ''}</span>
          </p>
          <div style={{ borderBottom: teachColor, width: '100%', marginTop: '-10px' }}></div>
        </div>
        
      </Box>
    </>
  );
}
