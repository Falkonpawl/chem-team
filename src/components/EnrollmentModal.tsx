import React from 'react';
import styles from './EnrollmentModal.module.css';
import moleculeIcon from '../assets/Логотип/Знак/Знак.svg';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <img src={moleculeIcon} alt="Molecule" className={styles.molecule} />

        <h2 className={styles.title}>Успейте<br />записаться!</h2>

        <p className={styles.subtitle}>
          Посетите первое пробное занятие<br />бесплатно
        </p>

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
          <button type="submit" className={styles.submitBtn}>
            Оставить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
