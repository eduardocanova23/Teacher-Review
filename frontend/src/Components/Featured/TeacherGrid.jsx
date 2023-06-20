import React from 'react';
import Grid from '@mui/material/Grid';
import TeacherCard from './TeacherCard';
import image1 from './images/zeus.PNG';
import image2 from './images/ares.PNG';
import image3 from './images/arqueiro.PNG';
import image4 from './images/deusaflor.PNG';
import image5 from './images/ferreiro.PNG';
import image6 from './images/foga.PNG';
import image7 from './images/frutas.PNG';
import image8 from './images/hades.PNG';
import image9 from './images/hermes.PNG';
import image10 from './images/musico.PNG';
import image11 from './images/pomba.PNG';
import image12 from './images/poseidon.PNG';
import image13 from './images/soldado.PNG';
import '../../css/TeacherGrid.css';
import { useProfessorList } from "./hooks/useProfessorLists";
import { useProfessor } from "./hooks/useProfessor";

import { Pagination, Autocomplete, TextField } from '@mui/material';

const TeacherGrid = () => {
  const { professorsList, filteredList, handleFilter } = useProfessorList();
  const [page, setPage] = React.useState(1);
  const [limits, setlimtis] = React.useState([0, 3]);
  const {inputProfessor, handleProfessorInput} = useProfessor();

  const imagePool = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13
  ];


  const getRandomImage = () => {
    // const randomImages = [];
    const randomIndex = Math.floor(Math.random() * imagePool.length);
    return imagePool[randomIndex];
  };

  const handleChange = (event, value) => {
    setPage(value);
    if (value == 1) {
      setlimtis([0, 3])
    } else {
      setlimtis([(value * 3) - 3, value * 3])
    }
  };

  const styles = {
    div: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '5%',
      alignItems: 'center'
    }
  }

  return (
    <>
        <Autocomplete
             value={inputProfessor}
             onChange={(event, newValue) => {
                 handleProfessorInput(newValue)
                 handleFilter(newValue)
             }}
             options={professorsList.length > 0? professorsList : []}
             loading={professorsList.length > 0? false : true}
             loadingText="Loading..."
             sx={{ width: '100%', mr: 1}}
             renderInput={(params) => <TextField {...params} label="Selecione um professor" />}
         />
      <div style={styles.div}>
        {filteredList ? filteredList.slice(limits[0], limits[1]).map((teacher) => {
          return (
            <div style={{width: 200}}>
                 <TeacherCard teacher={teacher} image={getRandomImage()} />
            </div>
           
          )
        }) :
          <></>
        }
      </div>
      <Pagination count={filteredList? Math.ceil(filteredList.length/3) : 0} page={page} onChange={handleChange} />

    </>
  );
};
export default TeacherGrid;