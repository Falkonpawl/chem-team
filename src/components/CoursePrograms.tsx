import React, { useState } from 'react';
import styles from './CoursePrograms.module.css';
import { programsData } from '../data/programsData';
import type { ClassProgram } from '../data/programsData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';

const ProgramClassBlock: React.FC<{ data: ClassProgram }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // We show 2 cards, so we can scroll up to modules.length - 2
    setCurrentIndex((prev) => Math.min(prev + 1, data.modules.length - 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={styles.classBlock}>
      <div className={styles.blockHeader}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.blockTitle}>Групповые занятия {data.classLevel}</h3>
          {data.subtitle && <h3 className={styles.blockSubtitle}>{data.subtitle}</h3>}
        </div>
        <div className={styles.navigation}>
          <button
            className={styles.navBtn}
            onClick={handlePrev}
            style={{
              opacity: currentIndex === 0 ? 0.3 : undefined,
              cursor: currentIndex === 0 ? 'default' : 'pointer'
            }}
          >
            <img src={leftBtn} alt="Previous" />
          </button>
          <button
            className={styles.navBtn}
            onClick={handleNext}
            style={{
              opacity: currentIndex >= data.modules.length - 2 ? 0.3 : undefined,
              cursor: currentIndex >= data.modules.length - 2 ? 'default' : 'pointer'
            }}
          >
            <img src={rightBtn} alt="Next" />
          </button>
        </div>
      </div>

      <div className={styles.carouselWindow}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * (455 + 20)}px)` }}
        >
          {data.modules.map((module) => (
            <div key={module.id} className={styles.card}>
              <h4 className={styles.cardTitle}>{module.title}</h4>
              <div className={styles.cardListWrapper}>
                <ul className={styles.moduleList}>
                  {module.items.map((item, idx) => (
                    <li key={idx} className={styles.listItem}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CoursePrograms: React.FC = () => {
  return (
    <section className={styles.programsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Программы курсов</h2>
        <div className={styles.blocksList}>
          {programsData.map((data, index) => (
            <ProgramClassBlock key={index} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePrograms;
