//公用按钮 了解更多
import { FC, useEffect, useState, ReactNode, useCallback } from "react";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";

import styles from "./LearnMore.module.css";
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {} & WithTranslation;

const LearnMore: FC<Props> = ({ t }) => {
  return <div className={styles.learn_more}>{t("了解更多")}</div>;
};

export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(LearnMore);
