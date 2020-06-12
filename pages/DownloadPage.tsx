import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import NextI18NextInstance from '../i18n.js';
import {
  Header,
  Banner,
  Classify,
  LearnMore,
  Footer,
  BreadcrumbNav,
  Detail,
  ContactUs
} from '../components';
import styles from '../public/css/DownloadPage.module.css';
const { i18n, withTranslation } = NextI18NextInstance;

const DownloadPage = ({ t }) => {
  return (
    <div className={styles.DownloadPage}>
      <Header></Header>
      <div className={styles.main}>
          <div className={styles.title}>{`${t('资源下载')}`}</div>
          <div className={styles.download_module}>
              <div className={styles.left}>
                  <img src="/downPage.png" alt=""/>
                      <p>{`${t('样本书')}`}</p>
              </div>
              <div className={styles.right}>
                  <a className={styles.downLoad} href="https://zardt.oss-cn-beijing.aliyuncs.com/front/Sample_Book.pdf" download='样本书.pdf' >{`${t('下载')}`}</a>
              </div>
          </div>
      </div>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(DownloadPage);
