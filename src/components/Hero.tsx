import React, { useState } from 'react';
import styles from './Hero.module.css';
import Button from './Button';
import mascotsImage from '../assets/Маскот/Маскоты Главная.png';
import { sendEmail } from '../services/emailService';

const Hero: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+375');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

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
      course: 'Главная (Hero)',
      target_email: 'sokolowskipawel55@gmail.com'
    });

    if (success) {
      setStatus('sent');
    } else {
      setStatus('error');
      alert('Ошибка при отправке. Попробуйте снова.');
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Онлайн школа<br />по химии
        </h1>

        <div className={styles.leftContent}>
          <h2 className={styles.subtitle}>Успейте<br />записаться!</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Имя"
              className={`${styles.input} ${nameError ? styles.inputError : ''}`}
              value={name}
              onChange={handleNameChange}
              disabled={status === 'sent' || status === 'sending'}
            />
            <input
              type="tel"
              placeholder="+375"
              className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
              value={phone}
              onChange={handlePhoneChange}
              disabled={status === 'sent' || status === 'sending'}
            />
            <div className={styles.buttonWrapper}>
              <Button
                text="Оставить заявку"
                type="primary"
                isSent={status === 'sent'}
                disabled={status === 'sending'}
              />
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
