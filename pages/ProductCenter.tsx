import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router, { useRouter } from "next/router"
import NextI18NextInstance from "../i18n.js";
import { Header, Banner, Classify, LearnMore, Footer, BreadcrumbNav } from "../components";
import styles from "../public/css/ProductCenter.module.css";
const { i18n, withTranslation } = NextI18NextInstance;
const ProductCenter = ({ t }) => {
    const [secondTitleAry, setSecondTitleAry]: any = useState(null)//当前的二级title
    const [currentLanguage, setCurrentLanguage] = useState<null | string>("cn"); //语言
    const router = useRouter()
    const { firstId, second_id, secondIndex }: any = router.query
    useEffect(() => {
        const secondTitle = localStorage.getItem("secondTitle")
        setSecondTitleAry(JSON.parse(secondTitle)[parseInt(secondIndex)])
    }, [secondIndex])
    useEffect(() => {
        const localLanguage = localStorage.getItem("language")
        setCurrentLanguage(localLanguage)
    }, [])

    console.log(router)
    console.log(secondTitleAry)
    console.log(currentLanguage)
    return (
        <>
            <Header></Header>
            <main className={styles.ProductCenter}>
                <BreadcrumbNav second={{
                    link: "/ProductCenter",
                    // title: "6"
                    title: secondTitleAry ? (currentLanguage === "cn" ? secondTitleAry.title
                        : secondTitleAry.titleEn) : "当前无数据"
                }}>
                </BreadcrumbNav>
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

