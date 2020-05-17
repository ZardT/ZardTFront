import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";

import styles from "./MoreBtn.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
type Props = {} & WithTranslation;
const MoreBtn: FC<Props> = ({ t }) => {
    return (
        <div className={styles.more_btn}></div>
        // <Link href={{ pathname: '/ProductCenter', query: { name: 'test' } }}><div className={styles.more_btn}>
        //     <a>{t("更多")} +</a>
        // </div></Link>
    )
}
export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] }, 
    };
}
export default withTranslation("common")(MoreBtn);
