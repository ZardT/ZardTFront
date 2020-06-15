import { useEffect, useState } from "react";
import { Row, Col, message } from "antd"
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
    const [allCategories, setAllCategories]: any = useState([])//所有一二级
    const [thirdlyList, setThirdlyList]: any = useState([])//产品列表
    const [presentSecond, setPresentSecond]: any = useState(0)//当前二级的下标
    const [current, setCurrent]: any = useState(1)//当前页数

    const [currentLanguage, setCurrentLanguage] = useState<null | string>("cn"); //语言
    const router = useRouter()
    const { firstId, second_id, secondIndex, firstTitle, firstTitleEn }: any = router.query

    useEffect(() => {
        if (secondIndex) {
            setPresentSecond(secondIndex)
            const secondTitle = localStorage.getItem("secondTitle")
            secondTitle && setSecondTitleAry(JSON.parse(secondTitle))
        } else {
            console.log("获取所有一二级数据")
            getRetrieveCategory()
        }
    }, [])
    //切换语言
    useEffect(() => {
        const localLanguage = localStorage.getItem("language")
        setCurrentLanguage(localLanguage)
    })

    useEffect(() => {
        router.query.firstId && getRetrieveProduct(firstId, second_id, 1)
    }, [router])

    // useEffect(() => {
    //     console.log(current)
    //     // getRetrieveProduct(second_id, current)
    // }, [current])


    //获取一二级类目列表
    const getRetrieveCategory = async () => {
        await axios.get("/product/retrieve-category").then(({ data }) => {
            console.log(data)
            setAllCategories(data)
            setSecondTitleAry(data[0]?.primary?.secondary)
            console.log(data[0])
            getRetrieveProduct(data[0]?._id, data[0]?.primary?.secondary[0]?._id, 1)
        })
    }

    //获取三级级类目列表(产品详情)
    const getRetrieveProduct = async (primaryId, secondaryId, current, more?, limit = 2) => {

        await axios.post("/product/retrieve-product", {
            primaryId,
            secondaryId,
            current,
            limit
        }).then(({ data: { list } }) => {
            console.log(list)
            more ? setThirdlyList([...thirdlyList, ...list]) : setThirdlyList(list)
            list.length === 0 ? message.info(t("已显示所有产品")) : null
            return list
        })
            .catch((res) => {
                console.log(res)
            })
    }
    return (
        <>
            <Header></Header>
            <main className={styles.ProductCenter}>
                <BreadcrumbNav second={{
                    title: firstTitle ? (currentLanguage === "cn" ? firstTitle : firstTitleEn)
                        : (allCategories.length > 0 ?
                            (currentLanguage === "cn" ? allCategories[0]?.primary?.title : allCategories[0]?.primary?.titleEn)
                            : null)
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
                                        getRetrieveProduct(firstId || allCategories[0]._id, item._id, 1)//获取点击的二级下的产品
                                        setPresentSecond(index)//当前的二级下标
                                        setCurrent(1)
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
                    <Col span={24}>
                        {thirdlyList.length > 0 && <div className={styles.more_btn} onClick={() => {
                            thirdlyList
                            const nub = current + 1
                            getRetrieveProduct(
                                firstId || allCategories[0]?._id,
                                second_id || allCategories[0]?.primary?.secondary[0]?._id,
                                nub, "more")
                            setCurrent(nub)
                        }}>
                            {t('更多')} +
                        </div>}
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

