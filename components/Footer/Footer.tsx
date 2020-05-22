//公用按钮 了解更多
import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import { Row, Col } from 'antd';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import { LearnMore } from '../index';
import styles from './Footer.module.css';
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
  contactUs?: boolean | null;
  footerAd?: boolean | null;
} & WithTranslation;

const Footer: FC<Props> = ({ t, contactUs, footerAd }) => {

  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 300,
        distance: "100px",
        duration: 500,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.logo}`);
      ScrollReveal().reveal(`.${styles.knowing_more}`);
      ScrollReveal().reveal(`.ant-col-4`);
    });
  }, []);
  return (
    <footer className={styles.footer}>
      {footerAd ? (
        <article className={styles.advertising}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/advertising.png"
            alt={`${t('广告')}`}
          />
        </article>
      ) : null}
      {contactUs ? (
        <div className={styles.contact_us_box}>
          <div className={styles.contact_us}>
            <h2>{t('联系我们')}</h2>
            <p>{`${t('公司地址')}：${t('浙江省乐清市柳市镇前州村')}`}</p>
            <p>{`${t('热销电话')}：86-15658191855`}</p>
            <p>{`${t('公司邮箱')}：clive@zardt.com`}</p>
            <div className={styles.knowing_more}>{t('进一步了解')}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.bottom_box}>
        <Row className={styles.bottom}>
          <Col className={styles.footer_logo}>
            <img src="/footer_logo.png" alt="logo" />
          </Col>
          <Col span={24} className={styles.footer_title}>
            <Row>
              <Col span={4}>
                <h3>{t('产品中心')}</h3>
              </Col>
              <Col span={4}>
                <h3>{t('企业介绍')}</h3>
              </Col>
              <Col span={4}>
                <h3>{t('资料下载')}</h3>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={4}>{t('扎带及工具')}</Col>
              <Col span={4}>{t('企业概述')}</Col>
              <Col span={4}>{t('尼龙扎带及配线器材样本书')}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={4}>{t('钢钉线卡')}</Col>
              <Col span={4}>{t('企业文化')}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={4}>{t('接线端子/压线帽')}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={4}>{t('电缆固定头')}</Col>
            </Row>
          </Col>
        </Row>
        <div className={styles.website_records_box}>
          <Row className={styles.website_records}>
            <Col span={6}>{t('乐清市永烨进出口有限公司')}</Col>
            <Col span={2}>© ZardT</Col>
            <Col span={2}>备案号</Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(Footer);
