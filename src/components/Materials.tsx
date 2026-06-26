import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Materials.module.css';
import { materialsData } from '../data/materialsData';
import type { Material } from '../data/materialsData';

import arrowBlue from '../assets/icons/Arrow blue.svg';
import arrowWhite from '../assets/icons/Arrow white.svg';

const MaterialCard: React.FC<{ material: Material }> = ({ material }) => {
  const isWhite = material.type === 'white';

  return (
    <Link to={`/articles/${material.slug}`} className={`${styles.card} ${isWhite ? styles.whiteCard : styles.transparentCard}`}>
      {material.title && <span className={styles.cardTitle}>{material.title}</span>}
      <div className={styles.arrowWrapper}>
        <img
          src={isWhite ? arrowBlue : arrowWhite}
          alt="arrow"
          className={styles.arrowIcon}
        />
      </div>
    </Link>
  );
};

const Materials: React.FC = () => {
  return (
    <section id="materials" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Материалы</h2>
        <div className={styles.list}>
          {materialsData.map((item) => (
            <MaterialCard key={item.id} material={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;
