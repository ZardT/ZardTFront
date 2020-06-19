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
  Overview,
  ContactUs
} from '../components';
import styles from '../public/css/ProductCenter.module.css';
const { i18n, withTranslation } = NextI18NextInstance;

const ProductDetailPage = ({ t }) => {
  const router = useRouter()
  // let DetailData = Router.query
  let [DetailData, handleDetail] = useState<any>(null)
  useEffect(() => {
    handleDetail(router.query)
    console.log(DetailData)
  })
  return (
    <div className={styles.ProductDetailPage}>
      <Header></Header>
      {/* <BreadcrumbNav second={{ link: "/index", title: "二级分类" }}></BreadcrumbNav> */}
      <Overview></Overview>
      {/* <ContactUs></ContactUs> */}
      <Footer contactUs={true}></Footer>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(ProductDetailPage);
