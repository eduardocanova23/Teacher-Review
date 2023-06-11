import React from "react";
import { useEffect, useState } from "react";
import { useSubjectList } from "./useSubjectList";
export const useRate = () => {
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

    return {inputRate, handleRateInput};
};