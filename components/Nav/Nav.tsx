//导航栏
import NextI18NextInstance from "../../i18n.js";
const { withTranslation } = NextI18NextInstance;
const Nav = () => {
  return <nav>导航栏</nav>;
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Nav);
