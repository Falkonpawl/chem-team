import React, { useState, useEffect } from 'react';
import styles from './EnrollmentModal.module.css';
import moleculeIcon from '../assets/Логотип/Знак/Знак.svg';
import { useModal } from '../context/ModalContext';
import { sendEmail } from '../services/emailService';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const { modalSource, modalChoice } = useModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+375');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setName('');
      setPhone('+375');
      setNameError(false);
      setPhoneError(false);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.slice(0, 20));
    setNameError(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith('+')) {
      const rest = value.substring(1).replace(/\D/g, '');
      value = '+' + rest;
    } else {
      value = '+' + value.replace(/\D/g, '');
    }
    if (!value.startsWith('+375')) value = '+375';
    if (value.length <= 13) setPhone(value);
    setPhoneError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (name.trim().length === 0) {
      setNameError(true);
      hasError = true;
    }
    if (phone.length < 13) {
      setPhoneError(true);
      hasError = true;
    }

    if (hasError) return;

    setStatus('sending');

    const success = await sendEmail({
      name,
      phone,
      course: modalSource,
      format: modalChoice,
      target_email: 'sokolowskipawel55@gmail.com'
    });

    if (success) {
      setStatus('sent');
    } else {
      setStatus('error');
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  };

  const isSent = status === 'sent';

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <button className={styles.backButton} onClick={onClose}>
        ← Вернуться назад
      </button>

      <div className={styles.modal}>
        <img src={moleculeIcon} alt="Molecule" className={styles.molecule} />

        <h2 className={styles.title}>Успейте<br />записаться!</h2>

        <p className={styles.subtitle}>
          Посетите первое пробное<br />занятие бесплатно
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            className={`${styles.input} ${nameError ? styles.inputError : ''}`}
            value={name}
            onChange={handleNameChange}
            disabled={isSent || status === 'sending'}
          />
          <input
            type="tel"
            placeholder="+375"
            className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
            value={phone}
            onChange={handlePhoneChange}
            disabled={isSent || status === 'sending'}
          />
          <button
            type="submit"
            className={`${styles.submitBtn} ${isSent ? styles.sentBtn : ''}`}
            disabled={status !== 'idle'}
          >
            {isSent ? 'Отправлено' : (status === 'sending' ? 'Отправка...' : 'Оставить заявку')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
