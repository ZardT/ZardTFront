import { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import NextI18NextInstance from "../i18n.js";
import { Header, Banner, Classify, LearnMore, Footer, BreadcrumbNav } from "../components";
import styles from "../public/css/ProductCenter.module.css";
const { i18n, withTranslation } = NextI18NextInstance;
const ProductCenter = () => {
    return (
        <div className={styles.ProductCenter}>
            <Header></Header>
            {/* <BreadcrumbNav second={{ link: "/index", title: "二级分类" }}></BreadcrumbNav> */}
            <Footer contactUs={true} footerAd={false}></Footer>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
    };
}
export default withTranslation("common")(ProductCenter);

