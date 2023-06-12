import React from "react";
import axios from "axios";
import config from '../../../config'
import { useEffect, useState } from "react";

export const useSubjectList = () => {
    const [subjectList, setSubjectList] = React.useState([]);
   
    const handleSubjectList = async (newValue) => {
        if(newValue){
            const response = await axios.post(
                config.api_url + '/get-teacher-subjects',
                {
                    "id": newValue["id"]
                }
            )
            if (response.status == 200) {
                const subjects = response["data"]["subjects"].map((subj) => {
                    return {
                        "label": subj.name,
                        "id": subj.id,
                        "teach_id": subj.teach_id
                    }
                })
                setSubjectList(subjects)
            }
        }
    };

    return {subjectList, handleSubjectList};
};