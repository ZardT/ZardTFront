import { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import NextI18NextInstance from "../i18n.js";
import { Header, Banner, Classify, LearnMore, Footer, BreadcrumbNav } from "../components";
import styles from "../public/css/ProductCenter.module.css";
const { i18n, withTranslation } = NextI18NextInstance;
const ProductCenter = ({ t }) => {
    useEffect(() => {
        console.log(location)
    }, [])
    return (
        <>
            <Header></Header>
            <main className={styles.ProductCenter}>
                <BreadcrumbNav second={{ link: "/index", title: "二级分类" }}></BreadcrumbNav>
            </main>
            <Footer></Footer>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] },
    };
}
export default withTranslation("common")(ProductCenter);

