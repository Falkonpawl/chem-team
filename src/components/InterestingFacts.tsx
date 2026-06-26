import React from 'react';
import styles from './InterestingFacts.module.css';
import Button from './Button';

import microscope from '../assets/Артефакты/Цветные/Микроскоп.svg';
import atom from '../assets/Артефакты/Цветные/Атом.svg';
import mascot from '../assets/Маскот/Добродетельный химик_сайт.svg';
import flask from '../assets/Артефакты/Цветные/Круглодонная колба.svg';

const InterestingFacts: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.block}>
        <img
          src={microscope}
          alt="Microscope"
          className={styles.microscope}
        />
        <img
          src={atom}
          alt="Atom"
          className={styles.atom}
        />
        <img
          src={mascot}
          alt="Mascot"
          className={styles.mascot}
        />
        <img
          src={flask}
          alt="Flask"
          className={styles.flask}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>Интересно знать!</h2>
          <p className={styles.subtext}>
            Переходите по ссылке узнать кто раскрашивает фейерверки
          </p>
          <div className={styles.buttonWrapper}>
            <Button text="Переходите к статьям" type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestingFacts;
