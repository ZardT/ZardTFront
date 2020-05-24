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
} from '../components';
import styles from '../public/css/ContactUsPage.module.css';
const { i18n, withTranslation } = NextI18NextInstance;

const ContactUsPage = ({ t }) => {
  const router = useRouter()
  // let DetailData = Router.query
  let [DetailData, handleDetail] = useState<any>(null)
  useEffect(() => {
    handleDetail(router.query)
    console.log(DetailData)
  })
  return (
    <div className={styles.ContactUsPage}>
      <Header></Header>
     <div className={styles.header}>
     {`${t('联系我们')}`}
     </div>
     <div className={styles.main}>
         <div className={styles.main_div1}>
             <img src="/address.png" alt=""/>
            <div className={styles.title}>{`${t('公司地址')}`}</div>
            <div className={styles.border}></div>
            <div className={styles.subtitle}>{`${t('浙江省乐清市柳市镇前州村')}`}</div>
         </div>
         <div className={styles.main_div2}>
             <img src="/mobile.png" alt=""/>
            <div className={styles.title}>{`${t('热销电话')}`}</div>
            <div className={styles.border}></div>
            <div className={styles.subtitle}>+86-156 5819 1855</div>
         </div>
         <div className={styles.main_div3}>
             <img src="/email.png" alt=""/>
            <div className={styles.title}>{`${t('公司邮箱')}`}</div>
            <div className={styles.border}></div>
            <div className={styles.subtitle}>clive@zardt.com</div>
         </div>
        

     </div>
      <Footer></Footer>
    </div>
  );
  
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(ContactUsPage);
