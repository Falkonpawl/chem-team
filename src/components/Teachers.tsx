import React, { useRef, useState, useEffect } from 'react';
import styles from './Teachers.module.css';

// Import images
import sofiaImg from '../assets/Фото преподавателей/София Васильевна.png';
import maximImg from '../assets/Фото преподавателей/Максим Андреевич.png';
import anastasiaImg from '../assets/Фото преподавателей/Анастасия Дмитриевна.png';
import vladislavImg from '../assets/Фото преподавателей/Владислав Владимирович.png';
import ivanImg from '../assets/Фото преподавателей/Владислав Владимирович.png';

// Import mascots
import sofiaMascot from '../assets/Маскот/Бурный учёный.svg';
import maximMascot from '../assets/Маскот/Отзывчивый врач_сайт.svg';
import anastasiaMascot from '../assets/Маскот/Добродетельный химик_сайт.svg';
import vladislavMascot from '../assets/Маскот/Доктор наук_сайт.svg';
import ivanMascot from '../assets/Маскот/Отзывчивый врач_сайт.svg';

// Import thin arrow icons
import leftArrowIcon from '../assets/icons/leftthinArrow.svg';
import rightArrowIcon from '../assets/icons/rightthinArrow.svg';

interface TeacherProps {
  name: string;
  experience: string;
  description: string[];
  image: string;
  mascot: string;
  imagePosition: 'left' | 'right';
  flipMascot?: boolean;
}

const TeacherCard: React.FC<TeacherProps> = ({ name, experience, description, image, mascot, imagePosition, flipMascot }) => {
  const nameParts = name.split(' ');

  return (
    <div className={`${styles.card} ${imagePosition === 'right' ? styles.reverse : ''}`}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.photo} />
        <img src={mascot} alt="" className={`${styles.mascot} ${flipMascot ? styles.flippedMascot : ''}`} />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>
          {nameParts.map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < nameParts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <p className={styles.experience}>{experience}</p>
        <ul className={styles.descriptionList}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Teachers: React.FC = () => {
  const cardsListRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (cardsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardsListRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = cardsListRef.current;
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

  const handlePrev = () => {
    if (cardsListRef.current) {
      const step = cardsListRef.current.clientWidth * (360 / 375);
      cardsListRef.current.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (cardsListRef.current) {
      const step = cardsListRef.current.clientWidth * (360 / 375);
      cardsListRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const teachersData: TeacherProps[] = [
    {
      name: "Софья Васильевна",
      experience: "Опыт работы: 5 лет",
      description: [
        "Курсы подготовки к ЦТ «ТурбоЦТ»",
        "Подготовка к областному этапу Республиканской олимпиады",
        "\"Юный химик\" на базе химического факультета БГУ",
        "Факультатив для профильного класса химбио"
      ],
      image: sofiaImg,
      mascot: sofiaMascot,
      imagePosition: 'left',
      flipMascot: true
    },
    {
      name: "Максим Андреевич",
      experience: "Опыт работы: 3 года",
      description: [
        "Курсы подготовки к ЦТ и ЦЭ \"Кедр\""
      ],
      image: maximImg,
      mascot: maximMascot,
      imagePosition: 'right',
      flipMascot: true
    },
    {
      name: "Анастасия Дмитриевна",
      experience: "Опыт работы: 2 года",
      description: [
        "\"Юный химик\" на базе химического факультета БГУ",
        "Детский научный клуб \"Умный Минск\"",
        "Курсы подготовки к поступлению по химии на базе лицея БГУ"
      ],
      image: anastasiaImg,
      mascot: anastasiaMascot,
      imagePosition: 'left',
      flipMascot: false
    },
    {
      name: "Владислав Владимирович",
      experience: "Опыт работы: 4 года",
      description: [
        "Факультатив для подготовки к олимпиадам для учащихся лицея БГУ.",
        "Курсы по подготовке к ЦТ на базе лицея БГУ.",
        "Сборы к республиканской и международной олимпиаде по химии."
      ],
      image: vladislavImg,
      mascot: vladislavMascot,
      imagePosition: 'right',
      flipMascot: false
    },
    {
      name: "Иван Сергеевич",
      experience: "Опыт работы: 2 года",
      description: [
        "Подготовка к экзаменационным дисциплинам «биохимия», «биоорганическая химия»",
        "Курсы подготовки к ЦТ «ТурбоЦТ»"
      ],
      image: ivanImg,
      mascot: ivanMascot,
      imagePosition: 'left',
      flipMascot: true
    }
  ];

  return (
    <section className={styles.teachersSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>Преподаватели</h2>
          <div className={styles.navButtonsWrapper}>
            <button
              className={`${styles.arrowButton} ${!canScrollLeft ? styles.hiddenArrow : ''}`}
              onClick={handlePrev}
              aria-label="Назад"
            >
              <img src={leftArrowIcon} alt="Назад" className={styles.arrowIcon} />
            </button>
            <button
              className={`${styles.arrowButton} ${!canScrollRight ? styles.hiddenArrow : ''}`}
              onClick={handleNext}
              aria-label="Вперед"
            >
              <img src={rightArrowIcon} alt="Вперед" className={styles.arrowIcon} />
            </button>
          </div>
        </div>
        <div className={styles.cardsList} ref={cardsListRef}>
          {teachersData.map((teacher, index) => (
            <TeacherCard key={index} {...teacher} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
