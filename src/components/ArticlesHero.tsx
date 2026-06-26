import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ArticlesHero.module.css';
import Button from './Button';
import mascotImage from '../assets/Маскот/Интересно знать.png';

interface ArticlesHeroProps {
  showBackButton?: boolean;
}

const ArticlesHero: React.FC<ArticlesHeroProps> = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {showBackButton && (
          <button
            className={styles.backButton}
            onClick={() => {
              navigate('/articles');
              // Даем время на переход и рендер, затем скроллим к материалам
              setTimeout(() => {
                const element = document.getElementById('materials');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            ← Вернуться назад
          </button>
        )}

        <h1 className={styles.title}>
          Интересно<br />знать!
        </h1>

        <div className={styles.leftContent}>
          <h2 className={styles.subtitle}>
            Запись в онлайн<br />школу по химии!
          </h2>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Имя"
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="+375"
              className={styles.input}
            />
            <div className={styles.buttonWrapper}>
              <Button text="Оставить заявку" type="primary" />
            </div>
          </form>
        </div>

        <div className={styles.rightContent}>
          <img src={mascotImage} alt="Маскот Интересно знать" className={styles.image} />
          <p className={styles.imageCaption}>
            Посетите первое пробное<br />занятие бесплатно
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticlesHero;
