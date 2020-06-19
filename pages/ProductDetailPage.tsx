import { useEffect, useState, FC } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import NextI18NextInstance from '../i18n.js';
import {
  Header,
  Banner,
  Classify,
  LearnMore,
  Footer,
  BreadcrumbNav,
  Detail
} from '../components';
import styles from '../public/css/ProductCenter.module.css';
const { i18n, withTranslation } = NextI18NextInstance;

const ProductDetailPage = ({ }) => {
  const [detailData, setDetailData] = useState({})
  useEffect(() => {
    const DetailData = localStorage.getItem("product")
    console.log(DetailData)
    if (DetailData) {

      setDetailData(JSON.parse(DetailData))
    }
  }, [])
  return (
    <div className={styles.ProductDetailPage}>
      <Header></Header>
      {/* <BreadcrumbNav second={{ link: "/index", title: "二级分类" }}></BreadcrumbNav> */}
      <Detail data={detailData} ></Detail>
      <Footer></Footer>
    </div>
  );
};
export default ProductDetailPage;
// export default withTranslation('common')(ProductDetailPage);
