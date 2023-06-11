import React from "react";
import axios from "axios";
import config from '../../config'
import { useEffect, useState } from "react";

export const useProfessorList = () => {
    const [professorsList, setProfessorList] = React.useState([]);

    const fetchProfessors = async () => {
        const response = await axios.get(
            config.api_url + '/get-all-teachers'
        )
        const profs = response["data"]["teacher-list"].map((prof) => {
            return {
                "label": prof.name,
                "id": prof.id
            }
        })
        setProfessorList(profs)
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    return {professorsList};
};