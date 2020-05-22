import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import NextI18NextInstance from '../i18n.js';
import { Header, Banner, Classify, LearnMore, Footer } from '../components';
import styles from '../public/css/index.module.css';
const { i18n, withTranslation } = NextI18NextInstance;
const recommend = [
  {
    id: 1,
    title: '自锁式尼龙扎带',
    src: 'https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png',
  },
  {
    id: 2,
    title: '快速连接器',
    src: 'https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png',
  },
  {
    id: 3,
    title: '吸盘定位片',
    src: 'https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png',
  },
  {
    id: 4,
    title: '膨胀管',
    src: 'https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png',
  },
];
const Homepage = ({ t }) => {

  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 500,
        distance: "100px",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.row}`);
      ScrollReveal().reveal(`.${styles.title}`);
      ScrollReveal().reveal(`.${styles.more_btn}`);
      ScrollReveal().reveal(`.${styles.learn_more}`);
      ScrollReveal().reveal(`.${styles.single_product}`);
      ScrollReveal().reveal(`.${styles.translate}`);
      ScrollReveal().reveal("h2");
      ScrollReveal().reveal("h3");
      ScrollReveal().reveal("h4");
      ScrollReveal().reveal("h5");
      ScrollReveal().reveal("p");
    });
  }, []);
  return (
    <div className="homePage">
      <Header></Header>
      <Banner></Banner>
      <main>
        <Classify title="精选产品" data={recommend}></Classify>
        <article className={styles.advertising}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/advertising.png"
            alt={`${t('广告')}`}
          />
          <div className={styles.ab_content}>
            <p>{t('ZardT致力于提供完整的')}</p>
            <p>
              <span>{t('电器安全/链接/固定')}</span>
              {t('解决方案')}
            </p>
            <LearnMore></LearnMore>
          </div>
        </article>
        <Classify title="产品展示" data={recommend}></Classify>
      </main>
      <Footer contactUs={true} footerAd={true}></Footer>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation('common')(Homepage);
