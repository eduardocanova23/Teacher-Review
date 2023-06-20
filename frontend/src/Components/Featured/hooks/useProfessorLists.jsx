import React from "react";
import axios from "axios";
import config from '../../../config'
import { useEffect, useState } from "react";

export const useProfessorList = () => {
    const [professorsList, setProfessorList] = React.useState([]);
    const [filteredList, setfilteredList] = React.useState([]);


    const fetchProfessors = async () => {
        const response = await axios.get(
            config.api_url + '/get-all-teachers'
        )
        if (response.status == 200){
            const profs = response["data"]["teacher-list"].map((prof) => {
                return {
                    "label": prof.name,
                    "id": prof.id
                }
            })
            console.log(profs)
            setProfessorList(profs)
            setfilteredList(profs)
        }
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    const handleFilter = (newValue) => {
        const current_list = professorsList.filter((teacher) => {
            return teacher == newValue
        })
        if(current_list.length > 0){
            setfilteredList(current_list)
        } else {
            setfilteredList(professorsList)
        }
    }

    return { professorsList, filteredList, handleFilter };


};