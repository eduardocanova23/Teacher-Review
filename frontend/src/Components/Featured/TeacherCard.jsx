import React from 'react';
import '../../css/TeacherCard.css';


const TeacherCard = ({ teacher, image }) => {
  const handleClick = () => {
    console.log('Button clicked for', teacher.name);
  };



  return (
    <div className="card">
      <img src={image} alt="Teacher" className="card-image" />
      <div >
        <h5>{teacher.label}</h5>
      </div>
    </div>
  );
};

export default TeacherCard;

