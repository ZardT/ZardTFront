import { useEffect } from "react";
import PropTypes from "prop-types";
import { Header, Banner, Classify, LearnMore, Footer } from "../components";
import Link from "next/link";
import NextI18NextInstance from "../i18n.js";
import styles from "../public/css/index.module.css";
const { i18n, withTranslation } = NextI18NextInstance;
const data = [{
  title: "自锁式尼龙扎带",
  src:
    "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
},
{
  title: "快速连接器",
  src:
    "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
},
{
  title: "吸盘定位片",
  src:
    "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
},
{
  title: "膨胀管",
  src:
    "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
}]
const Homepage = ({ t }) => {
  useEffect(() => { }, []);
  return (
    <div className="homePage">
      <Header></Header>
      <Banner></Banner>
      <main>
        <Classify
          title="精选产品"
          data={data}
        ></Classify>
        <article className={styles.advertising}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/advertising.png"
            alt={`${t("广告")}`}
          />
          <div className={styles.ab_content}>
            <p>ZardT致力于提供完整的</p>
            <p>
              <span>电器安全/链接/固定解决</span>方案
            </p>
            <LearnMore></LearnMore>
          </div>
        </article>
        <Classify
          title="产品展示"
          data={data}
        ></Classify>
      </main>
      <Footer contactUs={true} footerAd={true}></Footer>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation("common")(Homepage);
