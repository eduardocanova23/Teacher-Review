import React from 'react';
import '../../css/TeacherCard.css';
import { Link } from "react-router-dom";

const TeacherCard = ({ teacher, image }) => {
  const handleClick = () => {
    console.log('Button clicked for', teacher.name);
  };



  return (
    <Link to={`/professors/${teacher.id}`} style={{ textDecoration: 'none' }}>
       <div className="card">
       
       <img src={image} alt="Teacher" className="card-image" />
       <div >
         <h5>{teacher.label}</h5>
       </div>
     </div>
    </Link>
   
  );
};

export default TeacherCard;

