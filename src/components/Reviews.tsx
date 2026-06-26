import React, { useState, useRef } from 'react';
import styles from './Reviews.module.css';
import { reviewsData } from '../data/reviewsData';
import leftBtn from '../assets/icons/leftbutton.svg';
import rightBtn from '../assets/icons/rightbutton.svg';
import starIcon from '../assets/icons/Star.svg';

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const cardWidth = 294;
  const gap = 24;
  const step = cardWidth + gap;
  const visibleCards = 3;
  const maxIdx = reviewsData.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIdx));
  };

  // Mouse and Touch Drag Logic
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    // Walk is removed because we snap only on drag end for this implementation
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const pageX = 'changedTouches' in e ? (e as React.TouchEvent).changedTouches[0].pageX : (e as React.MouseEvent).pageX;
    const diff = startX - pageX;

    if (Math.abs(diff) > 50) { // threshold for swipe
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
              style={{ opacity: currentIndex === 0 ? 0.3 : 1, cursor: currentIndex === 0 ? 'default' : 'pointer' }}
            >
              <img src={leftBtn} alt="Previous" />
            </button>
            <button
              className={styles.navBtn}
              onClick={handleNext}
              style={{ opacity: currentIndex >= maxIdx ? 0.3 : 1, cursor: currentIndex >= maxIdx ? 'default' : 'pointer' }}
            >
              <img src={rightBtn} alt="Next" />
            </button>
          </div>
        </div>

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
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={starIcon} alt="star" className={styles.star} />
                  ))}
                </div>
                <h3 className={styles.author}>{review.author}</h3>
                <p className={styles.text}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
