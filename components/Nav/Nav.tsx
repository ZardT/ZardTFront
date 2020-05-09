//导航栏
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import { Row, Col, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";
import styles from "./Nav.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
const { Option } = Select;
const AppBar = [
  "扎带/线卡",
  "接线端子/连接器",
  "配线器材",
  "绝缘端头",
  "关于我们",
];
type Props = {
  // onHover: (value: string) => void;
} & WithTranslation;

const Nav: FC<Props> = ({ t }) => {
  // const Nav = () => {
  const [hoveBack, setHoveBack] = useState<null | number>(null); //导航移除备份
  const [isNavHover, setNavHover] = useState<null | number>(null); //显示导航栏的hover效果
  // const mouseMoveHandle = useCallback(() => {
  //   setNavHover(true);
  //   setShow(true);
  // }, []);

  useEffect(() => {
    // 当前选中的导航单元
    const nav = document.querySelectorAll(`.${styles.navigation}`); // 导航数组
    if (isNavHover !== null) {
      const horverTarget = nav[isNavHover];
      horverTarget.classList.add(styles.navigation_hover);
    } else {
      nav.forEach((e) => {
        e.classList.remove(styles.navigation_hover);
      });
    }
  }, [isNavHover]);

  const switchLanguage = (value: string) => {
    console.log(`selected ${value}`);
    i18n.changeLanguage((i18n.language = value));
  };
  return (
    <nav className={styles.nav_box}>
      <Row className={styles.nav}>
        <Col span={20}>
          <Row>
            {AppBar.map((item, index) => {
              return (
                <Col
                  className={styles.navigation}
                  key={index}
                  onMouseOver={() => {
                    setNavHover(index);
                  }}
                  onMouseOut={() => {
                    setHoveBack(index); // 备份
                    setNavHover(null);
                  }}
                >
                  {item}
                </Col>
              );
            })}
          </Row>
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
      <Row
        className={
          isNavHover !== null
            ? styles.drop_down_list
            : styles.drop_down_list_hide
        }
        onMouseOver={() => {
          setNavHover(hoveBack);
        }}
        onMouseOut={() => {
          setHoveBack(null);
          setNavHover(null);
        }}
      >
        <Col span={24}></Col>
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
