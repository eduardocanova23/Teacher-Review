
import React, { useState } from 'react';

import PopularReviewsContainer from '../PopularReviews/PopularReviewsContainer';
import FeaturedComponent from '../Featured/FeaturedComponent';

// import FeaturedComponent from './components/FeaturedComponent'
function MainPage() {
  return (
    <>
        <FeaturedComponent></FeaturedComponent>
        <PopularReviewsContainer n={3}></PopularReviewsContainer>
    </>
   
  );
}

export default MainPage;
