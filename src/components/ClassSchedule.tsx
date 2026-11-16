import React, { useState, useEffect } from 'react';
import styles from './ClassSchedule.module.css';
import { scheduleData } from '../data/scheduleData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';
import flaskIcon from '../assets/icons/колба.svg';

const ClassSchedule: React.FC = () => {
  const maxIdx = scheduleData.length - 1;

  // Desktop state starts at 11 класс (index 0)
  const [desktopIndex, setDesktopIndex] = useState(0);

  // Mobile state starts at 7 класс (index maxIdx = 4)
  const [mobileIndex, setMobileIndex] = useState(maxIdx);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop handlers
  const handleDesktopPrev = () => {
    setDesktopIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleDesktopNext = () => {
    setDesktopIndex((prev) => Math.min(prev + 1, maxIdx));
  };

  // Mobile handlers (inverted scrolling starting from 7 класс)
  const handleMobileLeft = () => {
    setMobileIndex((prev) => Math.min(prev + 1, maxIdx));
  };
  const handleMobileRight = () => {
    setMobileIndex((prev) => Math.max(prev - 1, 0));
  };

  const reversedData = [...scheduleData].reverse();
  const activeIndex = isMobile ? mobileIndex : desktopIndex;
  const trackIndex = maxIdx - activeIndex;

  return (
    <div className={styles.scheduleSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Расписание<br className={styles.mobileBr} /> групповых занятий
        </h2>

        {/* Desktop Controls */}
        <div className={styles.desktopControls}>
          <div className={styles.classBadge}>
            {scheduleData[desktopIndex].classLevel}
          </div>
          <div className={styles.navigation}>
            <button
              className={styles.navBtn}
              onClick={handleDesktopNext}
              style={{
                opacity: desktopIndex === maxIdx ? 0.3 : undefined,
                cursor: desktopIndex === maxIdx ? 'default' : 'pointer'
              }}
              disabled={desktopIndex === maxIdx}
              aria-label="Уменьшить класс"
            >
              <img src={leftBtn} alt="Decrease Class" />
            </button>
            <button
              className={styles.navBtn}
              onClick={handleDesktopPrev}
              style={{
                opacity: desktopIndex === 0 ? 0.3 : undefined,
                cursor: desktopIndex === 0 ? 'default' : 'pointer'
              }}
              disabled={desktopIndex === 0}
              aria-label="Увеличить класс"
            >
              <img src={rightBtn} alt="Increase Class" />
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className={styles.mobileControls}>
          <div className={styles.mobileClassBadge}>
            <button
              className={styles.mobileNavBtn}
              onClick={handleMobileLeft}
              style={{
                opacity: mobileIndex === maxIdx ? 0.3 : 1,
                cursor: mobileIndex === maxIdx ? 'default' : 'pointer'
              }}
              disabled={mobileIndex === maxIdx}
              aria-label="Младший класс"
            >
              <img src={leftBtn} alt="Previous Class" />
            </button>

            <span className={styles.mobileClassBadgeText}>
              {scheduleData[mobileIndex].classLevel}
            </span>

            <button
              className={styles.mobileNavBtn}
              onClick={handleMobileRight}
              style={{
                opacity: mobileIndex === 0 ? 0.3 : 1,
                cursor: mobileIndex === 0 ? 'default' : 'pointer'
              }}
              disabled={mobileIndex === 0}
              aria-label="Старший класс"
            >
              <img src={rightBtn} alt="Next Class" />
            </button>
          </div>
        </div>

        <div className={styles.calendarStrip}>
          <div className={styles.carouselWindow}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${trackIndex * 100}%)` }}
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
            style={{ transform: `translateX(-${trackIndex * 100}%)` }}
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
