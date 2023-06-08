import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormGroup, FormLabel, MenuItem } from '@mui/material';
import { Autocomplete, Typography, Slider, Select, InputLabel } from '@mui/material';
const ReviewForm = () => {
    const [inputProfessor, setProfessor] = React.useState("");
    const [inputSubject, setSubject] = React.useState("");
    const [inputDescription, setDescription] = React.useState("");
    const [inputPontuality, setPontuality] = React.useState(0);
    const [inputMamata, setMamata] = React.useState(0);



    const professors = {
        'daniel': ['a', 'b', 'c'],
        'andrea': ['e', 'f', 'g'],
        'teste': ['h', 'i', 'j']
    }
    const handleProfessorInput = (event, newValue) => {
        setProfessor(newValue)
        setSubject("")
    }
    return (
        <div className="Form" >
            <h1>Faça uma avaliação!</h1>
            <FormControl style={{width: '70%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5%'}}>
                    <Autocomplete
                        value={inputProfessor}
                        onChange={handleProfessorInput}
                        id="professor_ac"
                        options={Object.keys(professors)}
                        sx={{ width: '100%', mr: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione um professor" />}
                    />
                    
                    <Autocomplete
                        value={inputSubject}
                        onChange={(event, newValue) => {
                            setSubject(newValue);
                            console.log(newValue)
                        }}
                        disabled={inputProfessor? false : true}
                        id="professor_ac"
                        options={professors[inputProfessor]? professors[inputProfessor] : []}
                        sx={{ width: '100%', ml: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione uma disciplina" />}
                    />
                
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5%'}}>

                 <TextField
                    error={inputDescription.length > 250? true : false}
                    helperText="A descrição deve ter menos que 250 palavras"
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}
                    value={inputDescription}
                    id="outlined-multiline-flexible"
                    label="Quais os motivos da sua avaliação?"
                    multiline
                    sx={{ width: '100%', height: '50%'}}
                    rows={4}
                />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5%', alignItems: 'center'}}>
                    <div style={{ width: '100%'}}>
                    <Typography id="input-slider" gutterBottom>
                        Pontualidade
                    </Typography>
                    <Slider
                        aria-label="Small steps"
                        defaultValue={0}
                        getAriaValueText={inputPontuality}
                        step={2}
                        marks
                        min={0}
                        max={10}
                        valueLabelDisplay="auto"
                        />
                    </div>
                    <div  style={{ width: '100%'}}>
                        Texto de Feedback
                    </div>
                </div>
        
                
               
            </FormControl>
           


        </div>
    )
}

export default ReviewForm;