import React from 'react';
import styles from './Teachers.module.css';

// Import images
import sofiaImg from '../assets/Фото преподавателей/София Васильевна.png';
import maximImg from '../assets/Фото преподавателей/Максим Андреевич.png';
import anastasiaImg from '../assets/Фото преподавателей/Анастасия Дмитриевна.png';
import vladislavImg from '../assets/Фото преподавателей/Владислав Владимирович.png';
// Ivan's image is missing in the folder based on previous list_files, using Vladislav's as placeholder or Sofia's
import ivanImg from '../assets/Фото преподавателей/Владислав Владимирович.png';

interface TeacherProps {
  name: string;
  experience: string;
  description: string[];
  image: string;
  imagePosition: 'left' | 'right';
}

const TeacherCard: React.FC<TeacherProps> = ({ name, experience, description, image, imagePosition }) => {
  return (
    <div className={`${styles.card} ${imagePosition === 'right' ? styles.reverse : ''}`}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.photo} />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.experience}>{experience}</p>
        <ul className={styles.descriptionList}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Teachers: React.FC = () => {
  const teachersData: TeacherProps[] = [
    {
      name: "Софья Васильевна",
      experience: "Опыт работы: 5 лет",
      description: [
        "Курсы подготовки к ЦТ «ТурбоЦТ»",
        "Подготовка к областному этапу Республиканской олимпиады",
        "\"Юный химик\" на базе химического факультета БГУ",
        "Факультатив для профильного класса химбио"
      ],
      image: sofiaImg,
      imagePosition: 'left'
    },
    {
      name: "Максим Андреевич",
      experience: "Опыт работы: 3 года",
      description: [
        "Курсы подготовки к ЦТ и ЦЭ \"Кедр\""
      ],
      image: maximImg,
      imagePosition: 'right'
    },
    {
      name: "Анастасия Дмитриевна",
      experience: "Опыт работы: 2 года",
      description: [
        "\"Юный химик\" на базе химического факультета БГУ",
        "Детский научный клуб \"Умный Минск\"",
        "Курсы подготовки к поступлению по химии на базе лицея БГУ"
      ],
      image: anastasiaImg,
      imagePosition: 'left'
    },
    {
      name: "Владислав Владимирович",
      experience: "Опыт работы: 4 года",
      description: [
        "Факультет для подготовки к олимпиадам для учащихся лицея БГУ.",
        "Курсы по подготовке к ЦТ на базе лицея БГУ.",
        "Сборы к республиканской и международной олимпиаде по химии."
      ],
      image: vladislavImg,
      imagePosition: 'right'
    },
    {
      name: "Иван Сергеевич",
      experience: "Опыт работы: 2 года",
      description: [
        "Подготовка к экзаменационным дисциплинам «биохимия», «биоорганическая химия»",
        "Курсы подготовки к ЦТ «ТурбоЦТ»"
      ],
      image: ivanImg,
      imagePosition: 'left'
    }
  ];

  return (
    <section className={styles.teachersSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Преподаватели</h2>
        <div className={styles.cardsList}>
          {teachersData.map((teacher, index) => (
            <TeacherCard key={index} {...teacher} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
