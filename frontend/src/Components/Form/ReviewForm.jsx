import React from "react";
import TextField from '@mui/material/TextField';
import RateSlider from "./RateSlider";
import SubmitForm from "./SubmitForm";

import json_feed from './constants/feedbacks.json'
import { FormControl, Autocomplete} from '@mui/material';
import { useProfessor } from "./hooks/useProfessor";
import { useSubject } from "./hooks/useSubject";
import { useSubjectList } from "./hooks/useSubjectList";

import { useProfessorList } from "./hooks/useProfessorLists";
import { useRate } from "./hooks/useRate";
import { useDescription } from "./hooks/useDescription";

const ReviewForm = () => {
    const {inputProfessor, handleProfessorInput} = useProfessor();
    const {inputSubject, handleSubjectInput} = useSubject();
    const {professorsList} = useProfessorList();
    const {subjectList, handleSubjectList} = useSubjectList();
    const {inputDescription, handleDescriptionInput} = useDescription()
    const {inputRate, handleRateInput} = useRate() 
    
    const styles = {
        form_div: {
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '5%', 
            alignItems: 'center'
        }
    }


    const rates_list = []
    Object.keys(json_feed).forEach( (crit) => {
        rates_list.push(
        <div style={styles.form_div}>
        <RateSlider 
            input={inputRate} 
            set={handleRateInput}
            name={crit}
            feedbacks={json_feed[crit]}
        /></div>);
    });

    return (
        <div className="Form" style={{padding:20}}>
            <h1>Faça uma avaliação!</h1>
            <FormControl style={{width: '70%'}}>
                <div style={styles.form_div}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={inputProfessor}
                        onChange={(event, newValue) => {
                            handleProfessorInput(newValue)
                            handleSubjectList(newValue)
                        }}
                        options={professorsList.length > 0? professorsList : []}
                        loading={professorsList.length > 0? false : true}
                        loadingText="Loading..."
                        sx={{ width: '100%', mr: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione um professor" />}
                    />
                    
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={inputSubject}
                        onChange={handleSubjectInput}
                        disabled={inputProfessor? false : true}
                        options={subjectList.length > 0? subjectList : []}
                        loading={subjectList.length > 0? false : true}
                        loadingText="Loading..."
                        sx={{ width: '100%', ml: 1}}
                        renderInput={(params) => <TextField {...params} label="Selecione uma disciplina" />}
                    />
                
                </div>
             
                {rates_list}

                <div style={styles.form_div}>

                    <TextField
                    error={inputDescription.length > 250? true : false}
                    helperText="A descrição deve ter menos que 250 palavras"
                    onChange={handleDescriptionInput}
                    value={inputDescription}
                    id="outlined-multiline-flexible"
                    label="Quais os motivos da sua avaliação?"
                    multiline
                    sx={{ width: '100%', height: '50%'}}
                    rows={4}
                    />
                </div>
                <div>
                   <SubmitForm inputs={{
                     "Professor": inputProfessor,
                     "Disciplina": inputSubject,
                     "Notas": inputRate,
                     "Descrição": inputDescription
                   }}></SubmitForm>
                </div>
            </FormControl>
        </div>
    )
}

export default ReviewForm;