//导航栏
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import { Row, Col, Select } from "antd";
import GetAxios from "../../utils/axios";
import { DownOutlined } from "@ant-design/icons";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";
import styles from "./Nav.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
const axios = GetAxios()
const { Option } = Select;
type Props = {
  // onHover: (value: string) => void;
} & WithTranslation;

const Nav: FC<Props> = ({ t }) => {
  // const Nav = () => {
  const [hoveBack, setHoveBack] = useState<null | number>(null); //导航移除备份
  const [isNavHover, setNavHover] = useState<null | number>(null); //显示导航栏的hover效果
  const [currentLanguage, setCurrentLanguage] = useState<null | string>("cn"); //语言
  const [allCategories, setAllCategories] = useState<null | []>([]); //所有类目
  const [second, setSecond] = useState<null | []>([]); //第二级类目
  const [tertiary, setTertiary] = useState<null | []>([]); //第三级类目
  // const [firstId, setFirstId] = useState<null | string>(""); //第一级类目id
  // const [secondId, setSecondId] = useState<null | string>(""); //第二级类目id
  //数据获取
  useEffect(() => {
    RetrieveCategory()
  }, [])

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

  useEffect(() => {
    const localLanguage = localStorage.getItem("language")
    if (localLanguage) {
      setCurrentLanguage(localLanguage)
    }
    console.log(localLanguage)
  }, [currentLanguage])


  //获取一二三级类目列表
  const RetrieveCategory = async () => {
    const { data } = await axios.get("/api/product/retrieve-category", {})
    setAllCategories(data)
    // for (let first of data) {
    //   setSecond(first.primary.secondary)

    // }
  }

  //切换语言
  const switchLanguage = (value: string) => {
    localStorage.setItem("language", value)
    i18n.changeLanguage((i18n.language = value));
    setCurrentLanguage(value)
  };

  return (
    <nav className={styles.nav_box}>
      <Row className={styles.nav}>
        <Col span={20}>
          <Row>
            {allCategories.map((item: any, index) => {
              return (
                <Col
                  className={styles.navigation}
                  key={index}
                  onMouseOver={() => {
                    setNavHover(index);
                    setHoveBack(index);
                  }}
                  onMouseLeave={() => {
                    setHoveBack(null);
                    setNavHover(null);
                  }}
                >
                  {currentLanguage == "en" ? item.primary.titleEn : item.primary.title}
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={2}>
          <Select
            value={currentLanguage}
            style={{ width: 120 }}
            onChange={switchLanguage}
            bordered={false}
            defaultActiveFirstOption={false}
          >
            <Option value="cn">{t("中文")}</Option>
            <Option value="en">{t("英文")}</Option>
          </Select>
        </Col>
      </Row>
      <Row
        className={`${isNavHover !== null ? styles.drop_down_list : null} ${
          styles.drop_down_list_hide
          }`}
        onMouseEnter={() => {
          setNavHover(hoveBack);
          console.log("移入黑框")
        }}
        onMouseLeave={() => {
          setHoveBack(null);
          setNavHover(null);
        }}
      >
        <Col span={24} className={`${isNavHover !== null ? styles.memu : null} ${
          styles.memu_none
          }`}>
          <Row className={styles.category}>
            {

              allCategories.map((item: any, index) => {
                return (

                  item.primary.secondary.map((data, index) => {
                    console.log(data)
                    return (
                      <Col key={index}>
                        {currentLanguage == "en" ? data.titleEn : data.title}
                      </Col>
                    )
                  })
                )
              })
            }
          </Row>
        </Col>
      </Row>
    </nav>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] },
  };
}
export default withTranslation("common")(Nav);
