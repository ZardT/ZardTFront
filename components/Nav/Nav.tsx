//导航栏
import { Row, Col } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NextI18NextInstance from "../../i18n.js";
import styles from "./Nav.module.css";
const { SubMenu } = Menu;
const { withTranslation } = NextI18NextInstance;
const AppBar = [
  "扎带/线卡",
  "接线端子/连接器",
  "配线器材",
  "绝缘端头",
  "关于我们",
];

const Nav = ({ t }) => {
  return (
    <nav className={styles.nav}>
      <Row>
        {AppBar.map((item, index) => {
          return (
            <Col className={styles.navigation} key={index}>
              {t(`${item}`)}
            </Col>
          );
        })}
      </Row>
    </nav>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Nav);
