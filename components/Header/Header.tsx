import { Nav } from "../index";
import NextI18NextInstance from "../../i18n.js";
const { withTranslation } = NextI18NextInstance;
const Header = () => {
  return (
    <header>
      <Nav></Nav>
    </header>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Header);
