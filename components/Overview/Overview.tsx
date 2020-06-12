import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import styles from './overview.module.css';
import { BreadcrumbNav } from '../index';
const { withTranslation, i18n } = NextI18NextInstance;
import GetAxios from '../../utils/axios';
const axios = GetAxios();

const Overview = ({ t }) => {
    const [currentLanguage, setCurrentLanguage] = useState<null | string>('cn'); //语言

    return (
        <div className={styles.overview}>
            <div className={styles.top}>
                <div className={styles.topContent}>
                    <div className={styles.top_content_header}>
                        <span className={styles.white}>{`${t('可靠')}`}</span>
                        <span className={styles.yellow}>{`${t('品质')}`} </span>
                        <span className= {styles.white}>{`${t('源自')}`}</span>
                        <span className={styles.yellow}>{`${t('内涵')}`}</span>
                    </div>
                    <div className={styles.border}></div>
                    <div className={`${styles.white} ${styles.margin}`}>
                        {`${t('企业介绍')}`}
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <img
                    src="https://zardt.oss-cn-beijing.aliyuncs.com/front/aboutus_img.png"
                    alt=""
                />
                <div className={styles.main_content}>
                    <div className={styles.font_size}>{`${t('公司概述')}`}</div>
                    <div className={styles.main_text_content}>
                        <p>{`${t('公司名称：乐清市永烨进出口有限公司')}`}</p>
                        <p>{`${t('工厂基地：浙江省乐清市柳市镇前洲村')}`}</p>
                        <p>{`${t('创建时间：2014年')}`}</p>
                        <p>
                        {`${t('主营业务：尼龙扎带，钢钉线卡，热缩管，电缆固定头，缠绕管，接线端子，配线槽，压线帽')}`}
                        </p>
                        <p>{`${t('联系电话：+86-156 5819 1855')}`}</p>
                        <p>{`${t('电子邮件')}`}：clive@zardt.com</p>
                        <p>{`${t('官方网站')}`}：www.zardt.com</p>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className={styles.footer_div}>
                        <div className={styles.footer_div_content}>
                        <p className={styles.culture}>{`${t('企业文化')}`}</p>
                        <p className={styles.subtitle}>{`${t('诚信天下')}`}</p>
                        <p>{`${t('诚信是道路')}`},</p>
                        <p>{`${t('随着开拓者的脚步延伸')}`};</p>
                        <p>{`${t('诚信是智慧')}`}, </p>
                        <p>{`${t('随着博学者的求索积累')}`};</p>
                        <p>{`${t('诚信是成功')}`},</p>
                        <p>{`${t('随着奋进者的拼搏临近')}`};</p>
                        <p>{`${t('诚信是财富的种子')}`},</p>
                        <p>{`${t('只要你诚心种下')}`},</p>
                        <p>{`${t('就能找到打开金库的钥匙')}`}.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export async function getStaticProps() {
    return {
        props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
    };
}
export default withTranslation('common')(Overview);
