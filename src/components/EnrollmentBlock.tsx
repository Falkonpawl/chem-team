import React from 'react';
import styles from './EnrollmentBlock.module.css';
import Button from './Button';
import logo from '../assets/Логотип/Основной/Логтип_RGB_сайт.svg';
import mascot from '../assets/Маскот/Бурный учёный.svg';
import microscope from '../assets/Артефакты/Цветные/Микроскоп.svg';

const EnrollmentBlock: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img src={microscope} alt="" className={styles.microscope} />

        <div className={styles.content}>
          <h2 className={styles.title}>
            Записывайтесь<br />
            на курс в онлайн<br />
            школу
          </h2>

          <div className={styles.buttonWrapper}>
            <Button text="Оставить заявку" type="primary" />
          </div>
        </div>

        <img src={logo} alt="Chem-Team" className={styles.logo} />
        <img src={mascot} alt="Бурный ученый" className={styles.mascot} />
      </div>
    </section>
  );
};

export default EnrollmentBlock;
