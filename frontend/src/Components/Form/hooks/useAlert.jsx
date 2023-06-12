import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../../config'

export const useAlert = () => {
    const [alert, setAlert] = useState({
        'message': "",
        'severity': "",
        "loading": false
    })


    const handleAlert = (inputs) => {
        const alertObj = {'severity': 'warning'}
        console.log(inputs)
        const check = Object.keys(inputs).every((key) => {
            if (!inputs[key]) {
                alertObj['message'] = `Você deve preencher o campo ${key}`
                return false
            }
            return true
        })
        if (!check) setAlert(alertObj)
        return check
    }

    const handleSubmit = async (inputs, cleanFunc) => {
        setAlert({
            ...alert,
            "loading": true
            
        })
        const goodalertObj = {
            'message': `Submissão feita com sucesso`,
            'severity': 'success',
            "loading": false
        }

        const badalertObj = {
            'message': `Algo deu errado com a submissão`,
            "loading": false
        }
        const review_obj = {
            "professor_id": inputs["Professor"]["id"],
            "description": inputs["Descrição"],
            "teach_id": inputs["Disciplina"]["teach_id"],
            "m1": inputs["Notas"]["Pontualidade"],
            "m2": inputs["Notas"]["Organização"],
            "m3": inputs["Notas"]["Assiduidade"],
            "m4": inputs["Notas"]["Didática"],
            "m5": inputs["Notas"]["Nível de Mamata"]
        }


        const response = await axios.post(
            config.api_url + '/add-review',
            review_obj
        )
        
        if (response.status == 200){
            setAlert(goodalertObj)
        } else {
            setAlert(badalertObj)
        } 
            
    }

    return { alert, handleSubmit, handleAlert };
};