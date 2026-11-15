import React, { useState, useRef, useEffect } from 'react';
import styles from './Reviews.module.css';
import { reviewsData } from '../data/reviewsData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';
import leftArrowIcon from '../assets/icons/leftthinArrow.svg';
import rightArrowIcon from '../assets/icons/rightthinArrow.svg';

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = 294;
  const gap = 24;
  const step = cardWidth + gap;
  const visibleCards = 3;
  const maxIdx = reviewsData.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    if (mobileListRef.current) {
      const stepMobile = mobileListRef.current.clientWidth * (322 / 375);
      mobileListRef.current.scrollBy({ left: -stepMobile, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIdx));
    if (mobileListRef.current) {
      const stepMobile = mobileListRef.current.clientWidth * (322 / 375);
      mobileListRef.current.scrollBy({ left: stepMobile, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (mobileListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileListRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = mobileListRef.current;
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

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
  };

  const onDragMove = () => {
    if (!isDragging) return;
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const pageX = 'changedTouches' in e ? (e as React.TouchEvent).changedTouches[0].pageX : (e as React.MouseEvent).pageX;
    const diff = startX - pageX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Отзывы</h2>
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
                opacity: currentIndex >= maxIdx ? 0.3 : undefined,
                cursor: currentIndex >= maxIdx ? 'default' : 'pointer'
              }}
            >
              <img src={rightBtn} alt="Next" />
            </button>
          </div>
          <div className={styles.mobileNavButtonsWrapper}>
            <button
              className={`${styles.mobileArrowButton} ${!canScrollLeft ? styles.hiddenArrow : ''}`}
              onClick={handlePrev}
              aria-label="Назад"
            >
              <img src={leftArrowIcon} alt="Назад" className={styles.mobileArrowIcon} />
            </button>
            <button
              className={`${styles.mobileArrowButton} ${!canScrollRight ? styles.hiddenArrow : ''}`}
              onClick={handleNext}
              aria-label="Вперед"
            >
              <img src={rightArrowIcon} alt="Вперед" className={styles.mobileArrowIcon} />
            </button>
          </div>
        </div>

        {/* Desktop Carousel */}
        <div
          className={styles.carouselWindow}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <div
            ref={trackRef}
            className={`${styles.carouselTrack} ${isDragging ? styles.dragging : ''}`}
            style={{ transform: `translateX(-${currentIndex * step}px)` }}
          >
            {reviewsData.map((review) => (
              <div key={review.id} className={styles.card}>
                <h3 className={styles.author}>{review.author}</h3>
                <p className={styles.text}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scroll List */}
        <div className={styles.mobileCardsList} ref={mobileListRef}>
          {reviewsData.map((review) => (
            <div key={review.id} className={styles.mobileCard}>
              <h3 className={styles.mobileAuthor}>{review.author}</h3>
              <p className={styles.mobileText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
