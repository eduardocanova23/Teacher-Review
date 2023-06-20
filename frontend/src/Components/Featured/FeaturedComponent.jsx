import React from 'react';
import '../../css/FeaturedComponent.css';
import TeacherGrid from './TeacherGrid';

const FeaturedComponent = () => {
    return (
      <div className="featured">
        <h2 className="featured-title">Professores em Destaque</h2>
        <TeacherGrid />
      </div>
    );
  };

export default FeaturedComponent;
