import React, { useEffect, useState } from "react";
import {Stack, Alert, Button } from '@mui/material';
const RateSlider = (props) => {
    const [alert, setAlert] = useState({
        'message': "",
        'severity': ""
    })
    
    const handleSubmit = (inputs) => {
        
    }
    const checkSubmit = (inputs) => {
        let alertObj = {
            'message': `Submissão feita com sucesso`,
            'severity': 'success'
        }
        const check = Object.keys(inputs).every((key) => {
            if(inputs[key] === ""){
                alertObj = {
                    'message': `Você deve preencher o campo ${key}`,
                    'severity': 'warning'
                }
                return false
            }
            return true
        })
        if(check){
            handleSubmit(inputs)
            setAlert(alertObj)
        } else {
            setAlert(alertObj)
        }
    }
    return (
        <>  
                <Stack style={{alignItems: 'center'}} spacing={2}>
                    {alert['message']? <Alert style={{width: '70%', margin: 10}}  variant="outlined" severity={alert['severity']}>
                        {alert['message']}
                    </Alert > : <></>}
                    <Button  variant="contained"  style={{width: '60%', margin: 10}} onClick={() => checkSubmit(props.inputs)}>
                        Submeter
                    </Button>
                </Stack>
            
        </>
    )
}

export default RateSlider;