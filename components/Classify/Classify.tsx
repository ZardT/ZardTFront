//分类组件
import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import { MoreBtn } from '../index';
import styles from './Classify.module.css';
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
  title: string;
  data: Array<{ title: string | null; src: string }>;
} & WithTranslation;
const Classify: FC<Props> = ({ t, title, data }) => {
  const goDetail = (params) => (e) => {
    // e.stopPropagation();
    console.log(params);
    Router.push({
      pathname: `/ProductDetailPage`,
      query: {
        id: params.id,
      },
    });
  };
  return (
    <section className={styles.product}>
      <h2>{t(`${title}`)}</h2>
      <Row justify="space-between">
        {data.map((item, index) => {
          return (
            <Col flex="285px" className={styles.single_product} key={index}>
              <div onClick={goDetail(item)}>
                <img src={item.src} alt={t('产品图片')} />
                <p>{t(`${item.title}`)}</p>
              </div>
            </Col>
          );
        })}
      </Row>
      {title !== '精选产品' && title !== 'Select the product' && (
        <MoreBtn></MoreBtn>
      )}
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(Classify);
