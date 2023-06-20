import * as React from 'react';
import FeaturedComponent from '../Components/Featured/FeaturedComponent'
import ProfessorDetail from '../Components/Professor/ProfessorDetails';
// import {  BrowserRouter as Router,
//   Routes,
//   Route,
//   useRoutes, } from "react-router-dom";
//MUI components
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Stack from '@mui/material/Stack';
// import PermanentDrawerRight from './LeftDrower';
// 

const Home = () => {
  let routes = useRoutes([
    { path: "/", element: <FeaturedComponent /> },
    { path: "/professors/:professorId", element: <ProfessorDetail /> },
    // ...
  ]);
  return routes;
};

export default function HomeComponent() {
console.log('home chamada')
  return (
 
    <Router>
     <Home />
    </Router>

  );
}