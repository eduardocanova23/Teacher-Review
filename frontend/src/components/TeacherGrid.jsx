import React from 'react';
import Grid from '@mui/material/Grid';
import TeacherCard from './TeacherCard';
import image1 from '../images/zeus.PNG';
import image2 from '../images/ares.PNG';
import image3 from '../images/arqueiro.PNG';
import image4 from '../images/deusaflor.PNG';
import image5 from '../images/ferreiro.PNG';
import image6 from '../images/foga.PNG';
import image7 from '../images/frutas.PNG';
import image8 from '../images/hades.PNG';
import image9 from '../images/hermes.PNG';
import image10 from '../images/musico.PNG';
import image11 from '../images/pomba.PNG';
import image12 from '../images/poseidon.PNG';
import image13 from '../images/soldado.PNG';
import '../css/TeacherGrid.css'; 



const TeacherGrid = () => {
  const teachers = [
    { name: 'John Doe', subject: 'Math', id: 1 },
    { name: 'Jane Smith', subject: 'Science', id: 2 },
    { name: 'Bob Johnson', subject: 'English', id: 3 }
  ];

  const imagePool = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13]; 


  return (
    <div className="teacher-grid"> {/* Apply the teacher-grid class to the container */}
    <Grid container spacing={2}>
      {teachers.map((teacher) => (
        <Grid item xs={12} sm={6} md={4} key={teacher.id}>
            {teachers.map((teacher) => {
          const randomIndex = Math.floor(Math.random() * imagePool.length);
          const randomImage = imagePool[randomIndex];
          return (
            <TeacherCard key={teacher.id} teacher={teacher} image={randomImage} />
          );
        })}
          
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default TeacherGrid;
