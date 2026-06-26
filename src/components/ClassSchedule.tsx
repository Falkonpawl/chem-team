import React, { useState } from 'react';
import styles from './ClassSchedule.module.css';
import { scheduleData } from '../data/scheduleData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';
import flaskIcon from '../assets/icons/колба.svg';

const ClassSchedule: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    // Increase class level (e.g. 10 to 11) -> index decreases
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    // Decrease class level (11 -> 10) -> index increases
    setCurrentIndex((prev) => Math.min(prev + 1, scheduleData.length - 1));
  };

  // Reversed order for the inverted scroll effect
  const reversedData = [...scheduleData].reverse();
  const maxIdx = scheduleData.length - 1;

  return (
    <div className={styles.scheduleSection}>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.classBadge}>
            {scheduleData[currentIndex].classLevel}
          </div>
          <div className={styles.navigation}>
            <button
              className={styles.navBtn}
              onClick={handleNext}
              style={{
                opacity: currentIndex === maxIdx ? 0.3 : undefined,
                cursor: currentIndex === maxIdx ? 'default' : 'pointer'
              }}
            >
              <img src={leftBtn} alt="Decrease Class" />
            </button>
            <button
              className={styles.navBtn}
              onClick={handlePrev}
              style={{
                opacity: currentIndex === 0 ? 0.3 : undefined,
                cursor: currentIndex === 0 ? 'default' : 'pointer'
              }}
            >
              <img src={rightBtn} alt="Increase Class" />
            </button>
          </div>
        </div>

        <div className={styles.calendarStrip}>
          <div className={styles.carouselWindow}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${(maxIdx - currentIndex) * 100}%)` }}
            >
              {reversedData.map((schedule, sIdx) => (
                <div key={sIdx} className={styles.daysSlide}>
                  <div className={styles.daysWrapper}>
                    {schedule.days.map((day, idx) => (
                      <div key={idx} className={styles.dayItem}>
                        {day.hasLesson && (
                          <div className={styles.flaskWrapper}>
                            <img src={flaskIcon} alt="" className={styles.flask} />
                          </div>
                        )}
                        <span className={`${styles.dayText} ${day.hasLesson ? styles.lessonDayText : ''}`}>
                          {day.shortName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailsWindow}>
          <div
            className={styles.detailsTrack}
            style={{ transform: `translateX(-${(maxIdx - currentIndex) * 100}%)` }}
          >
            {reversedData.map((schedule, sIdx) => (
              <div key={sIdx} className={styles.detailsSlide}>
                <div className={styles.detailsList}>
                  {schedule.lessons.map((lesson, idx) => (
                    <div key={idx} className={styles.lessonItem}>
                      <span className={styles.bullet}>•</span>
                      <span className={styles.lessonTime}>{lesson.time}</span>
                      <span className={styles.lessonDivider}>—</span>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
