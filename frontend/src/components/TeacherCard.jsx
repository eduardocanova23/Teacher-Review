import React from 'react';
import '../css/TeacherCard.css';


const TeacherCard = ({ teacher, image }) => {
  const handleClick = () => {
    console.log('Button clicked for', teacher.name);
  };



  return (
    <div className="card">
      <img src={image} alt="Teacher" className="card-image" />
      <div className="card-content">
        <h5>{teacher.name}</h5>
        <button onClick={handleClick}>Adicionar avaliação</button>
      </div>
    </div>
  );
};

export default TeacherCard;

