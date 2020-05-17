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

const data = [
  {
    title: "扎带/线卡",
    second: [
      {
        title: "尼龙扎带",
        tertius: [
          {
            title: "自锁式尼龙扎带",
            src:
              "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
          },
          {
            title: "可退式尼龙扎带",
            src:
              "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
          },
          {
            title: "可松式尼龙扎带",
            src:
              "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
          },
          {
            title: "扎带及工具",
            src:
              "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
          },
          {
            title: "扎带及工具",
            src:
              "https://zardt.oss-cn-beijing.aliyuncs.com/front/product.png",
          }
        ]
      },
      {
        title: "不锈钢扎带",
        tertius: [
          {
            title: "自锁式尼龙扎带"
          }
        ]
      },
      {
        title: "钢钉线卡",
        tertius: [
          {
            title: "自锁式尼龙扎带"
          }
        ]
      },
      {
        title: "铁钉线卡",
        tertius: [
          {
            title: "自锁式尼龙扎带"
          }
        ]
      }
    ]
  },
  {
    title: "接线端子/连接器"
  },
  {
    title: "配线器材"
  },
  {
    title: "绝缘端头"
  },
  {
    title: "关于我们"
  }
]
type Props = {
  // onHover: (value: string) => void;
} & WithTranslation;

const Nav: FC<Props> = ({ t }) => {
  // const Nav = () => {
  const [hoveBack, setHoveBack] = useState<null | number>(null); //导航移除备份
  const [isNavHover, setNavHover] = useState<null | number>(null); //显示导航栏的hover效果
  const [currentLanguage, setCurrentLanguage] = useState<null | string>("cn"); //语言
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

  useEffect(() => {
    const localLanguage = localStorage.getItem("language")
    if (localLanguage) {
      setCurrentLanguage(localLanguage)
    }
    console.log(localLanguage)
  }, [currentLanguage])

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
            {data.map((item, index) => {
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
                  {item.title}
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
              data.map((item, index) => {
                return (
                  <Col key={index}>
                    {item.title}
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
