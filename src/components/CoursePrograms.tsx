import React, { useRef, useState, useEffect } from 'react';
import styles from './CoursePrograms.module.css';
import { programsData } from '../data/programsData';
import type { ClassProgram } from '../data/programsData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';
import leftArrowIcon from '../assets/icons/leftthinArrow.svg';
import rightArrowIcon from '../assets/icons/rightthinArrow.svg';

const ProgramClassBlock: React.FC<{ data: ClassProgram }> = ({ data }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scrollToCard = (index: number) => {
    if (trackRef.current) {
      const containerWidth = trackRef.current.clientWidth;
      const isTablet = window.innerWidth <= 1023 && window.innerWidth >= 769;

      if (isTablet) {
        // Tablet mode: first card on start edge, subsequent cards in center
        const cards = trackRef.current.children;
        if (cards[index]) {
          if (index === 0) {
            trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            const card = cards[index] as HTMLElement;
            const targetScroll = card.offsetLeft - containerWidth / 2 + card.offsetWidth / 2;
            trackRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
          }
        }
      } else {
        // Full Desktop (> 1023px): scroll by 2 cards at a time (930px per 2 cards)
        const cardStep = 455 + 20; // card width + gap
        const targetScroll = Math.floor(index / 2) * (cardStep * 2);
        trackRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (trackRef.current) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Mobile mode: scroll by 1 card at a time (264px width + 20px gap)
        const mobileStep = window.innerWidth * (264 + 20) / 375;
        trackRef.current.scrollBy({ left: -mobileStep, behavior: 'smooth' });
      } else {
        const isTablet = window.innerWidth <= 1023 && window.innerWidth >= 769;
        const step = isTablet ? 1 : 2;
        const nextIdx = Math.max(currentIndex - step, 0);
        setCurrentIndex(nextIdx);
        scrollToCard(nextIdx);
      }
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Mobile mode: scroll by 1 card at a time (264px width + 20px gap)
        const mobileStep = window.innerWidth * (264 + 20) / 375;
        trackRef.current.scrollBy({ left: mobileStep, behavior: 'smooth' });
      } else {
        const isTablet = window.innerWidth <= 1023 && window.innerWidth >= 769;
        const step = isTablet ? 1 : 2;
        const nextIdx = Math.min(currentIndex + step, data.modules.length - 1);
        setCurrentIndex(nextIdx);
        scrollToCard(nextIdx);
      }
    }
  };

  const is11Class = data.classLevel.includes('11 класс');

  return (
    <div className={styles.classBlock}>
      <div className={styles.blockHeader}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.blockTitle}>
            Групповые занятия
            {!is11Class ? (
              <>
                <br className={styles.mobileTitleBr} /> {data.classLevel}
              </>
            ) : (
              ` ${data.classLevel}`
            )}
          </h3>
          {data.subtitle && <h3 className={styles.blockSubtitle}>{data.subtitle}</h3>}
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNavigation}>
          <button
            className={styles.navBtn}
            onClick={handlePrev}
            style={{
              opacity: !canScrollLeft ? 0.3 : 1,
              cursor: !canScrollLeft ? 'default' : 'pointer'
            }}
            disabled={!canScrollLeft}
          >
            <img src={leftBtn} alt="Previous" />
          </button>
          <button
            className={styles.navBtn}
            onClick={handleNext}
            style={{
              opacity: !canScrollRight ? 0.3 : 1,
              cursor: !canScrollRight ? 'default' : 'pointer'
            }}
            disabled={!canScrollRight}
          >
            <img src={rightBtn} alt="Next" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={styles.mobileNavigation}>
          <button
            className={`${styles.mobileArrowButton} ${!canScrollLeft ? styles.hiddenArrow : ''}`}
            onClick={handlePrev}
            aria-label="Назад"
          >
            <img src={leftArrowIcon} alt="Назад" className={styles.arrowIcon} />
          </button>
          <button
            className={`${styles.mobileArrowButton} ${!canScrollRight ? styles.hiddenArrow : ''}`}
            onClick={handleNext}
            aria-label="Вперед"
          >
            <img src={rightArrowIcon} alt="Вперед" className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.carouselWindow}>
        <div className={styles.carouselTrack} ref={trackRef}>
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
