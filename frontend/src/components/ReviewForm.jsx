import React from "react";
import TextField from '@mui/material/TextField';
import RateSlider from "./RateSlider";
import json_feed from '../constants/feedbacks.json'
import { useProfessors } from "./hooks/useProfessors";
import { FormControl, Autocomplete} from '@mui/material';

const ReviewForm = () => {
    const {inputProfessor, handleProfessorInput} = useProfessors()
    const [inputSubject, setSubject] = React.useState("");
    const [inputDescription, setDescription] = React.useState("");
    const [inputRate, setRate] = React.useState({
        "Pontualidade": 0,
        "Organização": 0,
        "Assiduidade": 0,
        "Didática": 0,
        "Nível de Mamata": 0
    });

    const handleRateInput = (event, newValue) => {
        let newRateInput = {
            ...inputRate, 
        }
        newRateInput[event.target.name] = newValue
        setRate(newRateInput)
    }
    const professors = {
        'daniel':['a', 'b', 'c']
    }

    const styles = {
        form_div: {
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '5%', 
            alignItems: 'center'
        }
    }

    const handleSubjectInput = (event, newValue) => {
        setSubject(newValue);
        console.log(newValue)
    }


    return (
        <div className="Form" >
            <h1>Faça uma avaliação!</h1>
            <FormControl style={{width: '70%'}}>
                <div style={styles.form_div}>
                    <Autocomplete
                        value={inputProfessor}
                        onChange={handleProfessorInput}
                        options={Object.keys(professors)}
                        sx={{ width: '100%', mr: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione um professor" />}
                    />
                    
                    <Autocomplete
                        value={inputSubject}
                        onChange={handleSubjectInput}
                        disabled={inputProfessor? false : true}
                        options={professors[inputProfessor]? professors[inputProfessor] : []}
                        sx={{ width: '100%', ml: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione uma disciplina" />}
                    />
                
                </div>
                <div style={styles.form_div}>

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
                <div style={styles.form_div}>
                    <RateSlider 
                        input={inputRate} 
                        set={handleRateInput}
                        name="Pontualidade"
                        feedbacks={json_feed['Pontualidade']}
                    />
    
                </div>
            </FormControl>
        </div>
    )
}

export default ReviewForm;