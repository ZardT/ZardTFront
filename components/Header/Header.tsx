import { FC, useEffect, useState } from "react";
import { Row, Col, Input, Select } from "antd";
import Link from "next/link";
import NextI18NextInstance from "../../i18n.js";
import { WithTranslation } from "next-i18next";
import { SearchOutlined } from "@ant-design/icons";
import { Nav } from "../index";
import styles from "./Header.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
const { Option } = Select;
type Props = {
  // allCategories?: any
} & WithTranslation;
const Header: FC<Props> = ({ t }) => {
  // const switchLanguage = (value: string) => {
  //   console.log(`selected ${value}`);
  //   i18n.changeLanguage((i18n.language = value));
  // };
  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 300,
        distance: "100px",
        duration: 500,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.logo}`);
    });
  }, []);
  return (
    <header className={styles.header}>
      <Row>
        <Col span={24} className={styles.top}>
          <Row align="middle" gutter={[0, 20]}>
            <Col span={17}>
              <Col className={styles.logo}>
                <Link href="/index">
                  <a><img src="/logo.png" alt="logo" /></a>
                </Link>
              </Col>
            </Col>
            {/* <Col span={7}>
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
            </Col> */}
          </Row>
        </Col>
        <Col span={24}>
          <Nav></Nav>
        </Col>
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
