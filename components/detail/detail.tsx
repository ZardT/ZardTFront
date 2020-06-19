import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import styles from './detail.module.css';
import { BreadcrumbNav } from '../index';
const { withTranslation, i18n } = NextI18NextInstance;
import GetAxios from "../../utils/axios";
const axios = GetAxios()
type Props = {
    data: any;
    // id:number | null
} & WithTranslation;

const Detail: FC<Props> = ({ t, data }) => {
    const [localData, setlocalData] = useState<any>(null)
    const [currentLanguage, setCurrentLanguage] = useState<null | string>('cn'); //语言

    // useEffect(() => {

    //     setlocalData(data)
    // }, [data])
    return (
        <div>
            {data && (<div className={styles.detail}>

                {/* <div className={styles.detail_page}>
            <img className={styles.detail_image} src={data.src} alt="" />
        </div> */}
                <div className={styles.top}>
                    <img className={styles.top_left} src={data && data?.productPictureUrl} />
                    <div className={styles.top_right}>
                        <div className={styles.top_right_block}>
                            <div className={styles.top_right_title}>
                                {currentLanguage == 'en'
                                    ? data?.titlenEn
                                    : data?.title}

                            </div>

                            <BreadcrumbNav
                                second={{
                                    link: '/ProductCenter',
                                    title: data?.setitle,
                                }}
                                tertius={{
                                    link: '/detail',
                                    title: currentLanguage == 'en' ? data?.titleEn : data?.title,
                                }}
                            ></BreadcrumbNav>
                        </div>
                        <div className={styles.material}></div>
                        <div className={styles.material}>{data?.productDescription}</div>
                    </div>
                </div>
                <div className={styles.config}>
                    <div className={styles.config_title}>{t('技术参数')}</div>
                    <img src={data?.technicalParametersUrl} alt="" />
                </div>
            </div>)}
        </div>
    );
};
export async function getStaticProps() {
    return {
        props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
    };
}
export default withTranslation('common')(Detail);
