import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import NextI18NextInstance from '../i18n.js';
import { Header, Banner, Classify, LearnMore, Footer, MoreBtn } from '../components';
import GetAxios from "../utils/axios"
import styles from '../public/css/index.module.css';
const { i18n, withTranslation } = NextI18NextInstance;
const axios = GetAxios()

const Homepage = ({ t }) => {
  const [recommend, setRecommend] = useState([])
  const [allCategories, setAllCategories] = useState<null | any>([]); //一二级类目
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
  //数据获取
  useEffect(() => {
    // if (allCategories.length !== 0) {

    // } else {
    getFindAll()
    // }
  }, [])
  useEffect(() => {
    getRecommend()
  }, [])
  //获取所有类目列表
  const getFindAll = async () => {
    await axios.get("/product/find-all").then(({ data }) => {
      // console.log(data)
      setAllCategories(data)
    })

  }
  const getRecommend = async () => {
    await axios.get("/product/find-all-recommend").then(({ data }) => {
      setRecommend(data)
    })
  }
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
        <Classify title="产品展示" data={allCategories.length !== 0 ? allCategories[0].primary.secondary : []}></Classify>
        <MoreBtn></MoreBtn>
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
