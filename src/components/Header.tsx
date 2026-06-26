import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import styles from './Header.module.css';
import logo from '../assets/Логотип/Основной/Логтип_RGB_сайт.svg';
import { useModal } from '../context/ModalContext';

const Header: React.FC = () => {
  const { openModal } = useModal();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/">
          <img src={logo} alt="Chem-Team Logo" className={styles.logo} />
        </Link>
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
      </div>
    </header>
  );
};

export default Header;
