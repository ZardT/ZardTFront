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
  const goDetail = (params) => (e) => {
    console.log(params);
    Router.push({
      pathname: `/ProductDetailPage`,
      query: params
    });
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
      <Row justify="space-between">
        {data.map((item, index) => {
          return (
            <Col flex="285px" className={styles.single_product} key={index}>
              <div onClick={goDetail(item)}>
                <img src={item.productPictureUrl || item.detail.productPictureUrl || item.pictureUrl} alt={t('产品图片')} />
                <p>{item.title || item.detail.title}</p>
              </div>
            </Col>
          );
        })}
      </Row>
      {/* {title && title !== '精选产品' && title !== 'Select the product' && (
        <MoreBtn></MoreBtn>
      )} */}
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(Classify);
