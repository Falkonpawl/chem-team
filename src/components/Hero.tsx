import React from 'react';
import styles from './Hero.module.css';
import Button from './Button';
import mascotsImage from '../assets/Маскот/Маскоты Главная.png';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Онлайн школа<br />по химии
        </h1>

        <div className={styles.leftContent}>
          <h2 className={styles.subtitle}>Успейте<br />записаться!</h2>

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
          <img src={mascotsImage} alt="Маскоты" className={styles.image} />
          <p className={styles.imageCaption}>
            Посетите первое пробное<br />занятие бесплатно
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
