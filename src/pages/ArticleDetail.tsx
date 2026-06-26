import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { materialsData } from '../data/materialsData';
import ArticlesHero from '../components/ArticlesHero';
import styles from './ArticleDetail.module.css';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = materialsData.find(m => m.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', color: '#233e98' }}>
        <h2>Статья не найдена</h2>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Блок интересно знать как в начале (Hero) */}
      <ArticlesHero showBackButton={true} />

      {/* Блок текста с фоном Молекула M на полную ширину */}
      <div className={styles.contentSection}>
        <div className={styles.container}>
          {/* Слово интересно знать справа и отступ сверху 60 */}
          <div className={styles.headerLabel}>Интересно знать</div>

          {/* Заголовок 54 шрифт. После заголовков отступ в 52 пикселя. */}
          <h1 className={styles.mainTitle}>{article.title}</h1>

          <div className={styles.articleContent}>
            {article.content?.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return (
                    <p key={index} className={styles.paragraph}>
                      {block.parts ? (
                        block.parts.map((part, pIdx) => (
                          <span key={pIdx} style={{ color: part.color }}>
                            {part.text}
                          </span>
                        ))
                      ) : (
                        block.text
                      )}
                    </p>
                  );
                case 'subheader':
                  return (
                    <h2 key={index} className={styles.subheader}>
                      {block.text}
                    </h2>
                  );
                case 'image':
                  return (
                    <img
                      key={index}
                      src={block.src}
                      alt={block.alt || ''}
                      className={styles.articleImage}
                    />
                  );
                default:
                  return null;
              }
            })}

            {!article.content && (
              <div className={styles.paragraph}>
                Здесь будет содержание статьи "{article.title}".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
