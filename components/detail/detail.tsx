import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import styles from './detail.module.css';
import { BreadcrumbNav } from '../index';
const { withTranslation, i18n } = NextI18NextInstance;
type Props = {
    data: any;
    // id:number | null
} & WithTranslation;

const Detail: FC<Props> = ({ t, data }) => {
    const [currentLanguage, setCurrentLanguage] = useState<null | string>('cn'); //语言

    useEffect(() => {
        const localLanguage = localStorage.getItem('language');
        if (localLanguage) {
            setCurrentLanguage(localLanguage);
        }
    }, [currentLanguage]);
    const switchLanguage = (value: string) => {
        localStorage.setItem('language', value);
        i18n.changeLanguage((i18n.language = value));
        setCurrentLanguage(value);
    };
    return (
        <div>
        {data && (<div className={styles.detail}>
        
            {/* <div className={styles.detail_page}>
            <img className={styles.detail_image} src={data.src} alt="" />
        </div> */}
            <div className={styles.top}>
                <img className={styles.top_left} src={data && data.src} />
                <div className={styles.top_right}>
                    <div className={styles.top_right_block}>
                        <div className={styles.top_right_title}>
                            {currentLanguage == 'en'
                                ? data.titleEn
                                : data.title}
                               
                        </div>

                        <BreadcrumbNav
                            second={{
                                link: '/index',
                                title: data && data.second_title,
                            }}
                            tertius={{
                                link: '/index',
                                title: data && data.title,
                            }}
                        ></BreadcrumbNav>
                    </div>
                    <div className={styles.material}></div>
                    {/* <div className={styles.material}>测试11111111111111111111111111111111111111111111111111111</div>
                    <div className={styles.material}>测试11111111111111111111111111111111111111111111111111111</div> */}
                </div>
            </div>
            <div className={styles.config}>
                <div className={styles.config_title}>技术参数</div>
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
