import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoWhite from '../assets/Логотип/Основной/Логтип_RGB_белый.png';
import telegramIcon from '../assets/icons/telegram.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import upIcon from '../assets/icons/upbutton.svg';
import Button from './Button';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Вопрос"
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="+375"
              className={styles.input}
            />
            <div className={styles.buttonRow}>
              <img src={telegramIcon} alt="Telegram" className={styles.telegramIcon} />
              <Button text="Отправить" type="secondary" />
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
