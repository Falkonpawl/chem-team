import React from 'react';
import ArticlesHero from '../components/ArticlesHero';
import Materials from '../components/Materials';
import EnrollmentBlock from '../components/EnrollmentBlock';

const Articles: React.FC = () => {
  return (
    <div className="articles-page">
      <ArticlesHero />
      <Materials />
      <EnrollmentBlock />
    </div>
  );
};

export default Articles;
