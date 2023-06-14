import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuListComposition from './TabMenu.js'

const drawerWidth = 240;

export default function PermanentDrawerRight({page, setPage}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <MenuListComposition page = {page} setPage = {setPage}/>
      </Drawer>
    </Box>
  );
}