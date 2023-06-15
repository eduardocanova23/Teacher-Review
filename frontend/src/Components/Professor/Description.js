import React, { useState, useEffect } from 'react';
//MUI components
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Stack from '@mui/material/Stack';
import {useDescription} from './hooks/useDescription'

export default function MenuListComposition({page, setPage,professor_id}) {
    const {reviewList, handleReviewList} = useDescription();

    useEffect(() => {
        handleReviewList(professor_id)    
    });
    console.log(reviewList)
  // get the descriptions 
  
  //do a map for the descrition

  // do the mini chat for the descriptions 
  return (
    <></>
  );
}