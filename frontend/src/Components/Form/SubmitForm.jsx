import React from "react";
import {Stack, Alert  } from '@mui/material';
import { useAlert } from "./hooks/useAlert";
import { LoadingButton } from '@mui/lab';

const RateSlider = (props) => {
    const  { alert, handleSubmit, handleAlert } = useAlert();
    const handleBtnClick = () => {
        const check = handleAlert(props.inputs)
        if (!check) return
        const status = handleSubmit(props.inputs,  props.clean)
    }
    return (
        <>  
                <Stack style={{alignItems: 'center'}} spacing={2}>
                    {alert['message']? <Alert style={{width: '70%', margin: 10}}  variant="outlined" severity={alert['severity']}>
                        {alert['message']}
                    </Alert > : <></>}
                    <LoadingButton  loading={alert["loading"]} variant="contained"  style={{width: '60%', margin: 10}} onClick={handleBtnClick}>
                        Submeter
                    </LoadingButton >
                </Stack>
            
        </>
    )
}

export default RateSlider;