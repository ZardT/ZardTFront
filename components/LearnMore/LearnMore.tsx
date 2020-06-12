//公用按钮 了解更多
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";

import styles from "./LearnMore.module.css";
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {} & WithTranslation;

const LearnMore: FC<Props> = ({ t }) => {

  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 500,
        distance: "100px",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.learn_more}`);
    });
  }, []);
  return <div className={styles.learn_more}>{t("了解更多")}</div>;
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] },
  };
}
export default withTranslation("common")(LearnMore);
