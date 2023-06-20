import React, { useState, useEffect } from 'react';
import DescriptionMap from '../Components/Professor/DescriptionMap'
import {useDescription} from '../Components/Professor/hooks/useDescription'


export default function ProfComponent() {
  const id = 1;
  const {reviewList, handleReviewList} = useDescription();

  useEffect(() => {
    handleReviewList(id);
  }, []);
  
  return (
    <DescriptionMap professor_id={id} reviewList = {reviewList}/> 
  );
}