import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export const useProfessors = () => {
    const [inputProfessor, setProfessor] = React.useState("");

    const handleProfessorInput = (event, newValue) => {
        setProfessor(newValue)
    }

    const fetchProfessors = async () => {
        // const response = await axios.get(
        //     "https://fakestoreapi.com/Professors"
        // );

        // if (response && response.data) setProducts(response.data);
    };

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    return {inputProfessor, handleProfessorInput};
};