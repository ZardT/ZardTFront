import { useEffect, useState } from "react";
import { Row, Col } from "antd"
import PropTypes from "prop-types";
import Link from "next/link";
import Router, { useRouter } from "next/router"
import NextI18NextInstance from "../i18n.js";
import { Header, Banner, Classify, LearnMore, Footer, BreadcrumbNav } from "../components";
import GetAxios from "../utils/axios";
import styles from "../public/css/ProductCenter.module.css";
const { i18n, withTranslation } = NextI18NextInstance;
const axios = GetAxios()
const ProductCenter = ({ t }) => {
    const [secondTitleAry, setSecondTitleAry]: any = useState([])//所有的二级title
    const [thirdlyList, setThirdlyList]: any = useState([])//产品列表
    const [presentSecond, setPresentSecond]: any = useState(0)//当前二级的下标

    const [currentLanguage, setCurrentLanguage] = useState<null | string>("cn"); //语言
    const router = useRouter()
    const { firstId, second_id, secondIndex }: any = router.query

    useEffect(() => {
        setPresentSecond(secondIndex)
        const secondTitle = localStorage.getItem("secondTitle")
        secondTitle && setSecondTitleAry(JSON.parse(secondTitle))
    }, [])
    //切换语言
    useEffect(() => {
        const localLanguage = localStorage.getItem("language")
        setCurrentLanguage(localLanguage)
    })

    useEffect(() => {
        router.query.firstId && getRetrieveProduct(second_id)
    }, [router])

    // useEffect(() => {
    //     setPresentSecond(secondIndex)
    //     console.log(presentSecond)
    // }, [presentSecond])
    //获取三级级类目列表(产品详情)
    const getRetrieveProduct = async (second_id, current = 1, limit = 10) => {

        const res: any = await axios.post("/product/retrieve-product", {
            primaryId: firstId,
            secondaryId: second_id,
            current,
            limit
        })
        if (res) {
            console.log(res)
            const { data: { list } } = res
            setThirdlyList(list)
        }
    }
    return (
        <>
            <Header></Header>
            <main className={styles.ProductCenter}>
                <BreadcrumbNav second={{
                    title: secondTitleAry.length !== 0 && presentSecond !== undefined ? (currentLanguage === "cn" ?
                        secondTitleAry[parseInt(presentSecond)].title
                        : secondTitleAry[parseInt(presentSecond)].titleEn) : "当前无数据"
                }}>
                </BreadcrumbNav>
                <Row className={styles.second_title_list}>
                    {secondTitleAry ?
                        secondTitleAry.map((item, index) => {
                            return (

                                <Col key={index} span={2}
                                    className={styles.second_title}
                                    style={{ fontWeight: index == presentSecond ? 550 : 500 }}
                                    onClick={() => {
                                        getRetrieveProduct(item._id)//获取点击的二级下的产品
                                        setPresentSecond(index)//当前的二级下标
                                    }}
                                >
                                    {currentLanguage === "cn" ? item.title : item.titleEn}
                                </Col>
                            )
                        })
                        :
                        null
                    }
                </Row>
                <Row className={styles.product_list}>
                    <Col span={24}>
                        <Classify data={thirdlyList}></Classify>
                    </Col>
                </Row>
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

