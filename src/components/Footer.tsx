import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoWhite from '../assets/Логотип/Основной/Логтип_RGB_белый.png';
import telegramIcon from '../assets/icons/telegram.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import upIcon from '../assets/icons/upbutton.svg';
import Button from './Button';
import { sendEmail } from '../services/emailService';

const Footer: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [phone, setPhone] = useState('+375');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [questionError, setQuestionError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value.slice(0, 200));
    setQuestionError(false);
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

    if (question.trim().length === 0) {
      setQuestionError(true);
      hasError = true;
    }
    if (phone.length < 13) {
      setPhoneError(true);
      hasError = true;
    }

    if (hasError) return;

    setStatus('sending');
    const success = await sendEmail({
      question,
      phone,
      target_email: 'sokolowskipawel55@gmail.com'
    });

    if (success) {
      setStatus('sent');
    } else {
      setStatus('error');
      alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button className={styles.upButton} onClick={scrollToTop}>
          <img src={upIcon} alt="Наверх" />
        </button>

        <div className={styles.formSection}>
          <h2 className={styles.title}>Остались вопросы?</h2>
          <p className={styles.subtitle}>
            Позвоните или напишите нам! Мы ответим на все ваши вопросы!
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Вопрос"
              className={`${styles.input} ${questionError ? styles.inputError : ''}`}
              value={question}
              onChange={handleQuestionChange}
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
            <div className={styles.buttonRow}>
              <img src={telegramIcon} alt="Telegram" className={styles.telegramIcon} />
              <Button
                text="Отправить"
                type="secondary"
                isSent={status === 'sent'}
                disabled={status === 'sending'}
              />
            </div>
          </form>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.logoSide}>
            <img src={logoWhite} alt="Chem-Team Logo" className={styles.logo} />
          </div>
          <nav className={styles.navSide}>
            <Link to="/schedule" className={styles.footerNavLink} onClick={scrollToTop}>Расписание</Link>
            <Link to="/articles" className={styles.footerNavLink} onClick={scrollToTop}>Статьи</Link>
          </nav>
          <div className={styles.socialSide}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <img src={instagramIcon} alt="Instagram" />
              <span>@xumteam</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <img src={tiktokIcon} alt="TikTok" />
              <span>@xumteam</span>
            </a>
          </div>

          <div className={styles.mobileNavAndSocialBlock}>
            <div className={styles.mobileLinkLine}>
              <Link to="/schedule" className={styles.footerNavLink} onClick={scrollToTop}>Расписание</Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <img src={instagramIcon} alt="Instagram" />
                <span>@xumteam</span>
              </a>
            </div>
            <div className={styles.mobileLinkLine}>
              <Link to="/articles" className={styles.footerNavLink} onClick={scrollToTop}>Статьи</Link>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <img src={tiktokIcon} alt="TikTok" />
                <span>@xumteam</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
