import React, { useState, useEffect } from 'react';
//MUI components
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './css/Item.css'

export default function DescriptionComponent({description, materia,date}) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor:  '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
      }));
    
    var dataObj = new Date(date);
    var dataFormatada = dataObj.toLocaleDateString("pt-BR");

  return (
        <Item style={{paddingBottom : '10px', marginBottom: '10px'}}>  
            <div className="item-container">
            <div className="info-container">
                <div className="materia">{materia}</div>
                <div className="date">{dataFormatada}</div>
            </div>
            <div className="description">{description}</div>
            </div>
        </Item>
  );
}