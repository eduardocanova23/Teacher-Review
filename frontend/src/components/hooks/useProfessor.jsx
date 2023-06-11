import React from "react";
import { useEffect, useState } from "react";
import { useSubjectList } from "./useSubjectList";
export const useProfessor = () => {
    const [inputProfessor, setProfessor] = React.useState("");

    const handleProfessorInput = (newValue) => {
        setProfessor(newValue)
    }

    return {inputProfessor, handleProfessorInput};
};