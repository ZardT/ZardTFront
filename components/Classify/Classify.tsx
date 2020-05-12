//分类组件
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import { Row, Col } from "antd";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";

import styles from "./Classify.module.css";
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
  title: string;
  data: Array<{ title: string; src: string }>;
} & WithTranslation;
const Classify: FC<Props> = ({ t, title, data }) => {
  return (
    <section className={styles.product}>
      <h2>{t(`${title}`)}</h2>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => {
          console.log(item);
          return (
            <Col span={6} className={styles.single_product} key={index}>
              <div>
                <img src={item.src} alt={t("产品图片")} />
                <p>{item.title}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Classify);
