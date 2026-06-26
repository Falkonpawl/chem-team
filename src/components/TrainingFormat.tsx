import React from 'react';
import styles from './TrainingFormat.module.css';
import Button from './Button';
import { useModal } from '../context/ModalContext';

const TrainingFormat: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.topTitle}>Формат обучения</h2>

        <div className={styles.content}>
          <div className={styles.block}>
            <h3 className={styles.title}>Как строится процесс обучения?</h3>
            <p className={styles.text}>Мы предлагаем нашим ученикам удобный для них формат работы</p>
            <ul className={styles.list}>
              <li>Индивидуальные</li>
              <li>Групповые</li>
              <li>Сплит</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>Материалы</h3>
            <p className={styles.text}>Собранные в одном месте ресурсы для ваших онлайн-занятий</p>
            <ul className={styles.list}>
              <li>Интерактивная доска</li>
              <li>Материалы</li>
              <li>Домашние задания</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>Онлайн платформа</h3>
            <p className={styles.text}>Наши занятия проходят на проверенной платформе</p>
            <ul className={styles.list}>
              <li>Yutu class</li>
            </ul>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button text="Оставить заявку" type="secondary" onClick={openModal} />
        </div>
      </div>
    </section>
  );
};

export default TrainingFormat;
