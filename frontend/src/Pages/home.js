import * as React from 'react';
import MainPage from '../Components/Home/MainPage'
import ProfessorDetail from '../Components/Professor/ProfessorDetails';
import {  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes } from "react-router-dom";
// 

const Home = () => {
  let routes = useRoutes([
    { path: "/", element: <MainPage /> },
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