import PropTypes from "prop-types";
import { Header, Banner, Classify } from "../components";
import Link from "next/link";
import NextI18NextInstance from "../i18n.js";
import { useEffect } from "react";
const { i18n, withTranslation } = NextI18NextInstance;
const Homepage = ({ t }) => {
  useEffect(() => {}, []);
  return (
    <div className="homePage">
      <Header></Header>
      <Banner></Banner>
      <main>
        <Classify
          title="精选产品"
          data={[
            {
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
            },
          ]}
        ></Classify>
      </main>
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
