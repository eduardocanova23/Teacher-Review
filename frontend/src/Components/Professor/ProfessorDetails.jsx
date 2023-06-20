import React from "react"
// import {useParams} from "react-router-dom"
// import { useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

function ProfessorDetail() {
    const {professorId} = useParams()
    let navigate = useNavigate();
    return (
        <div>
            <div style={{position:'absolute', margin: 20}}>
                <IconButton onClick={() => navigate(-1)} aria-label="delete" size="small">
                <ArrowBack fontSize="small" />
                Voltar
                </IconButton>
            </div>
            <div>
                <h1>Teste {professorId}</h1>
            </div>
        </div>
    )
}

export default ProfessorDetail