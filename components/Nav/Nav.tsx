//导航栏
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import Router from 'next/router'
import { Row, Col, Select } from "antd";
import Link from 'next/link';
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
  const [allCategories, setAllCategories] = useState<null | []>([]); //一二级类目
  const [second, setSecond] = useState<null | []>([]); //第二级类目
  const [tertiary, setTertiary] = useState<null | []>([]); //第三级类目
  const [nowadayFirst, setNowadayFirst] = useState<null | any>([]); //当前一级类目下的二级类目
  const [firstId, setFirstId] = useState<null | string>(""); //第一级类目id
  // const [firstIndex, setFirstIndex] = useState<null | number>(0); //当前一级类目下标
  //数据获取
  useEffect(() => {
    if (allCategories.length !== 0) {

      // RetrieveProduct()
    } else {
      getFindAll()
      // getRetrieveCategory()
    }
  })

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
  }, [currentLanguage])


  //获取所有类目列表
  const getFindAll = async () => {
    const { data } = await axios.get("/product/find-all")
    setAllCategories(data)
    for (let { primary, _id } of data) {
    }
    // setTertiary(data.list)
  }
  //获取一二级类目列表
  // const getRetrieveCategory = async () => {
  //   const { data } = await axios.get("/product/retrieve-category")
  //   setAllCategories(data)
  //   if (data) {

  //   }
  // }

  //获取三级级类目列表(产品详情)
  // const getRetrieveProduct = async (index) => {
  //   const { _id: primaryId } = allCategories[index]
  //   console.log(primaryId)
  //   const { data } = await axios.post("/product/retrieve-product", {
  //     primaryId
  //   })
  //   console.log("三级详情:" + data)
  //   // setTertiary(data.list)
  // }

  //切换语言
  const switchLanguage = (value: string) => {
    localStorage.setItem("language", value)
    i18n.changeLanguage((i18n.language = value));
    setCurrentLanguage(value)
  };

  const handRouter = (title, item, index?) => {
    const { _id: second_id } = item
    console.log(nowadayFirst)
    if (title === "tertiary") {
      Router.push({
        pathname: "/ProductDetailPage",
        query: { firstId, second_id, index },
      })
    } else if (title === "second") {
      const secondTitle = []
      for (let { title, titleEn } of nowadayFirst) {
        secondTitle.push({ title, titleEn })
      }
      localStorage.setItem("secondTitle", JSON.stringify(secondTitle))
      Router.push({
        pathname: "/ProductCenter",
        query: { firstId, second_id, secondIndex: index },
      })
    }
  }
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
                    setNowadayFirst(item.primary.secondary)
                    setFirstId(item._id)
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
          <Row className={styles.category} >
            {

              nowadayFirst.length !== 0 && nowadayFirst.map((item: any, index) => {
                return (

                  <Col key={index} span={4} className={styles.second_box}>
                    <div className={styles.second} onClick={() => { handRouter("second", item, index) }}>
                      {currentLanguage == "en" ? item.titleEn : item.title}
                    </div>

                    <Row className={styles.tertiary_box}>
                      {item.detail.map((value, index) => {
                        return (
                          < Col key={index} className={styles.tertiary}
                            onClick={() => { handRouter("tertiary", item, index) }}>
                            {currentLanguage == "en" ? value.titleEn : value.title
                            }
                          </Col>
                        )
                      })}
                    </Row>
                  </Col>
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
