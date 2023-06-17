import React, { useEffect, useState } from 'react';
import ProfessorScore from './ProfessorScore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

export default function ProfessorScoreContainer() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>
          <ProfessorScore/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore/>
        </Grid>
        <Grid item xs={1}>
          <ProfessorScore/>
        </Grid>
      </Grid>
    </Box>
  );
}
