import PropTypes from "prop-types";
import { Header, Banner } from "../components";
import Link from "next/link";
import NextI18NextInstance from "../i18n.js";
import { useEffect } from "react";
const { i18n, withTranslation } = NextI18NextInstance;
const Homepage = ({ t }) => {
  useEffect(() => {
    console.log(i18n);
    console.log("1");
  }, []);
  return (
    <div className="homePage">
      <Header></Header>
      <Banner></Banner>
      <main>{t("哈哈")}</main>
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
