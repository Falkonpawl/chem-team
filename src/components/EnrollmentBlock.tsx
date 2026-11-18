import React from 'react';
import styles from './EnrollmentBlock.module.css';
import Button from './Button';
import logo from '../assets/Логотип/Основной/Логтип_RGB_сайт.svg';
import mascot from '../assets/Маскот/Бурный учёный.svg';
import microscope from '../assets/Артефакты/Цветные/Микроскоп.svg';
import { useModal } from '../context/ModalContext';

const EnrollmentBlock: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img src={microscope} alt="" className={styles.microscope} />

        <div className={styles.content}>
          <h2 className={styles.title}>
            Записывайтесь<br />
            на курс<br className={styles.mobileBr} />
            <span className={styles.desktopSpace}> </span>в онлайн<br />
            <span className={styles.lastLine}>
              школу
              <img src={logo} alt="Chem-Team" className={styles.mobileLogo} />
            </span>
          </h2>

          <div className={styles.buttonWrapper}>
            <Button text="Оставить заявку" type="primary" onClick={openModal} />
          </div>
        </div>

        <img src={logo} alt="Chem-Team" className={styles.desktopLogo} />
        <img src={mascot} alt="Бурный ученый" className={styles.mascot} />
      </div>
    </section>
  );
};

export default EnrollmentBlock;
