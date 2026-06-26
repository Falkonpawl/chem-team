import React from 'react';
import styles from './Pricing.module.css';
import Button from './Button';

import mascot1 from '../assets/Маскот/стоимость/Стоимость маскот 1.png';
import mascot2 from '../assets/Маскот/стоимость/Стоимость маскот 2.png';
import mascot3 from '../assets/Маскот/стоимость/Стоимость маскот 3.png';
import mascot4 from '../assets/Маскот/стоимость/Стоимость маскот 4.png';

interface PricingCardProps {
  title: React.ReactNode;
  priceLabel: string;
  priceValue: string;
  features: string[];
  mascot: string;
  mascotSize: { width: number; height: number };
  mascotRight: number;
  isDoublePrice?: boolean;
  priceValue2?: string;
  priceLabel2?: string;
  hasBadges?: boolean;
  tightSpacing?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title, priceLabel, priceValue, features, mascot, mascotSize, mascotRight,
  isDoublePrice, priceLabel2, priceValue2, hasBadges, tightSpacing
}) => {
  return (
    <div className={`${styles.card} ${tightSpacing ? styles.firstCard : ''}`}>
      <div className={styles.contentLeft}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <div className={styles.priceColumn}>
              <span className={styles.priceLabel}>{priceLabel}</span>
              <span className={styles.priceValue}>{priceValue}</span>
              <div className={styles.gradientLine}></div>
            </div>
            {isDoublePrice && (
              <div className={styles.priceColumn} style={{ marginLeft: '36px' }}>
                <span className={styles.priceLabel}>{priceLabel2}</span>
                <span className={styles.priceValue}>{priceValue2}</span>
                <div className={styles.gradientLine}></div>
              </div>
            )}
          </div>
        </div>

        <ul className={`${styles.featuresList} ${tightSpacing ? styles.tight : ''}`}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className={styles.bottomRow}>
          <Button text="Оставить заявку" type="secondary" />
          {hasBadges && (
            <div className={styles.badgesWrapper}>
              <div className={styles.badge}>Онлайн</div>
              <div className={styles.badge}>Офлайн</div>
            </div>
          )}
        </div>
      </div>

      <img
        src={mascot}
        alt="Mascot"
        className={styles.mascot}
        style={{
          width: mascotSize.width,
          height: mascotSize.height,
          right: mascotRight
        }}
      />
    </div>
  );
};

const Pricing: React.FC = () => {
  const cards: PricingCardProps[] = [
    {
      title: <>Групповые занятия 11 класс<br />Подготовка к ЦТ и ЦЭ</>,
      priceLabel: "Стоимость одного занятия",
      priceValue: "27 BYN",
      features: [
        "Абонемент 8 занятий = 216 BYN",
        "Онлайн формат",
        "Длительность занятия 90 минут",
        "Мини-группы до 7 человек"
      ],
      mascot: mascot1,
      mascotSize: { width: 425, height: 333 },
      mascotRight: 28,
      tightSpacing: true
    },
    {
      title: "Групповые занятия 7-10 классы",
      priceLabel: "Стоимость одного занятия",
      priceValue: "23 BYN",
      features: [
        "Абонемент 8 занятий = 184 BYN",
        "Онлайн формат",
        "Длительность занятия 60 минут",
        "Мини-группы до 7 человек"
      ],
      mascot: mascot2,
      mascotSize: { width: 546, height: 271 },
      mascotRight: 36
    },
    {
      title: "Сплит занятия",
      priceLabel: "Стоимость одного занятия с человека",
      priceValue: "30 BYN",
      features: [
        "Занятие для Двоих (Вы+Друг) = 60 BYN",
        "В любое удобное для Вас время",
        "Онлайн формат",
        "Длительность занятия 60 минут"
      ],
      mascot: mascot3,
      mascotSize: { width: 485, height: 312 },
      mascotRight: 36
    },
    {
      title: "Индивидуальные занятия",
      priceLabel: "Стоимость разового занятия",
      priceValue: "55 BYN",
      isDoublePrice: true,
      priceLabel2: "Стоимость занятия в абонементе",
      priceValue2: "50 BYN",
      features: [
        "Абонемент 4 занятий = 200 BYN / 8 занятий = 400 BYN",
        "Индивидуальный план",
        "Поддержка 24/7",
        "Длительность занятия 60 минут"
      ],
      mascot: mascot4,
      mascotSize: { width: 297, height: 317 },
      mascotRight: 56,
      hasBadges: true
    }
  ];

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Стоимость занятий</h2>
        <div className={styles.cardsList}>
          {cards.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
