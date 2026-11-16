import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import styles from './Header.module.css';
import logo from '../assets/Логотип/Основной/Логтип_RGB_сайт.svg';
import logoWhite from '../assets/Логотип/Основной/Логтип_RGB_белый.png';
import menuIcon from '../assets/icons/Menu.svg';
import { useModal } from '../context/ModalContext';

const Header: React.FC = () => {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
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
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" onClick={closeMenu} className={styles.logoLink}>
          <img src={logo} alt="Chem-Team Logo" className={styles.logo} />
        </Link>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <img src={menuIcon} alt="Меню" className={styles.menuIcon} />
        </button>
        <nav className={styles.navigation}>
          <NavLink
            to="/schedule"
            className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
          >
            Расписание
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
          >
            Статьи
          </NavLink>
        </nav>
        <div className={styles.buttonWrapper}>
          <Button text="Оставить заявку" type="primary" onClick={openModal} />
        </div>

        {isMenuOpen && (
          <div className={styles.mobileMenuOverlay}>
            <div className={styles.mobileMenuHeader}>
              <Link to="/" onClick={closeMenu} className={styles.mobileMenuLogoLink}>
                <img src={logoWhite} alt="Chem-Team Logo" className={styles.mobileMenuLogo} />
              </Link>
              <div className={styles.mobileMenuSubtext}>
                Онлайн школа<br />по химии
              </div>
            </div>

            <button className={styles.backButton} onClick={closeMenu}>
              ← Вернуться назад
            </button>

            <nav className={styles.mobileMenuNav}>
              <Link to="/" onClick={closeMenu} className={styles.mobileNavItem}>
                <span>Главная</span>
                <svg className={styles.diagonalArrow} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 4.5L18.5 18.5M18.5 18.5V7M18.5 18.5H7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link to="/schedule" onClick={closeMenu} className={styles.mobileNavItem}>
                <span>Расписание</span>
                <svg className={styles.diagonalArrow} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 4.5L18.5 18.5M18.5 18.5V7M18.5 18.5H7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link to="/articles" onClick={closeMenu} className={styles.mobileNavItemArticles}>
                <span>Статьи</span>
                <svg className={styles.diagonalArrow} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 4.5L18.5 18.5M18.5 18.5V7M18.5 18.5H7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </nav>

            <div className={styles.mobileMenuButtonWrapper}>
              <Button
                text="Оставить заявку"
                type="secondary"
                onClick={() => {
                  closeMenu();
                  openModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
