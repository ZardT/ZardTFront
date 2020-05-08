import { Nav } from "../index";
import { Row, Col, Input, Select } from "antd";
import NextI18NextInstance from "../../i18n.js";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Header.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
const { Option } = Select;
const Header = ({ t }) => {
  const switchLanguage = (value: string) => {
    console.log(`selected ${value}`);
    i18n.changeLanguage((i18n.language = value));
  };
  const navigationShow = () => {};
  return (
    <header className={styles.header}>
      <Row className={styles.top}>
        <Col span={24}>
          <Row align="middle" gutter={[0, 20]}>
            <Col span={17}>
              <Col>
                <img src="/logo.png" alt="logo" />
              </Col>
            </Col>
            <Col span={7}>
              <Row>
                <Col span={24}>
                  <Input
                    className={styles.search}
                    placeholder={`${t("搜索产品")}`}
                  ></Input>
                  <SearchOutlined style={{ fontSize: 18, color: "#000" }} />
                </Col>
                <Col className={styles.linear}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align="middle">
            <Col span={21}>
              <Nav></Nav>
            </Col>
            <Col span={2}>
              <Select
                defaultValue="cn"
                style={{ width: 120 }}
                onChange={switchLanguage}
                bordered={false}
                defaultActiveFirstOption={false}
                // dropdownStyle={{ background: "#000" }}
              >
                <Option value="cn">{t("中文")}</Option>
                <Option value="en">{t("英文")}</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles.drop_down_list}>
        <Col span={24}></Col>
      </Row>
    </header>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Header);
