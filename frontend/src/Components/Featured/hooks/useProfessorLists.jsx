import React from "react";
import axios from "axios";
import config from '../../../config'
import { useEffect, useState } from "react";

export const useProfessorList = () => {
    const [professorsList, setProfessorList] = React.useState([]);

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
        }
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    return {professorsList};


    
//   const imagePool = [
//     image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13
//   ];

//   const getRandomTeachers = () => {
//     const randomTeachers = [];
//     const totalTeachers = teachers.length;

//     for (let i = 0; i < 3; i++) {
//       const randomIndex = Math.floor(Math.random() * totalTeachers);
//       randomTeachers.push(teachers[randomIndex]);
//     }

//     return randomTeachers;
//   };

//   const getRandomImages = () => {
//     const randomImages = [];

//     for (let i = 0; i < 3; i++) {
//       const randomIndex = Math.floor(Math.random() * imagePool.length);
//       randomImages.push(imagePool[randomIndex]);
//     }

//     return randomImages;
//   };

//   const randomTeachers = getRandomTeachers();
//   const randomImages = getRandomImages();

};