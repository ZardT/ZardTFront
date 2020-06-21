//分类组件
import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import Router from 'next/router'
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import { MoreBtn } from '../index';
import styles from './Classify.module.css';
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
  title?: string;
  data?: any;
} & WithTranslation;
const Classify: FC<Props> = ({ t, title, data }) => {


  const [currentLanguage, setCurrentLanguage] = useState<null | string>('cn'); //语言

  //切换语言
  useEffect(() => {
    const localLanguage = localStorage.getItem("language")
    setCurrentLanguage(localLanguage)
})

  const goDetail = (params) => {
    // console.log(params)
    if (params.title) {

      Router.push({
        pathname: `/ProductCenter`
      });
    } else {

      Router.push({
        pathname: `/ProductDetailPage`
      });
      localStorage.setItem("product", JSON.stringify(
        {
          ...params.detail,
          setitle: params.title,
          setitleEn: params.titleEn,
          secondaryId: params._id
        }))
    }
  };

  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 500,
        distance: "100px",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.single_product}`);
    });
  }, []);
  return (
    <section className={styles.product}>
      {title ? <h2>{t(`${title}`)}</h2> : null}
      <Row>
        {data.map((item, index) => {
          return (
            <Col flex="285px" className={styles.single_product} key={index}>
              <div onClick={() => {
                goDetail(item)
              }}>
                <img src={item.productPictureUrl || item.detail.productPictureUrl || item.pictureUrl} alt={t('产品图片')} />
                <p>{(currentLanguage == "cn" ? item.title : item.titleEn) || (currentLanguage == "cn" ? item.detail.title : item.detail.titleEn)}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </section >
  );
};

export async function getStaticProps() {

  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}

export default withTranslation('common')(Classify);
