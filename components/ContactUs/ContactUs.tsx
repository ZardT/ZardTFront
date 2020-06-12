import { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';
import styles from './ContactUs.module.css';
import { BreadcrumbNav } from '../index';
const { withTranslation, i18n } = NextI18NextInstance;
import GetAxios from "../../utils/axios";
const axios = GetAxios()


const ContactUs = ({t}) => {

   
      

      
    return (
        <div className={styles.ContactUs}>
            <div className={styles.title}>{`${t('联系我们')}`}</div>
            <div className={styles.address}>{`${t('公司地址：浙江省乐清市柳市镇前洲村')}`}</div>
            <div className={styles.font}>{`${t('联系电话：+86-156 5819 1855')}`}</div>
            <div className={styles.font}>{`${t('电子邮件')}`}clive@zardt.com</div>
            <Link href="/ContactUsPage">
            <div className={styles.btn}>{`${t('进一步了解')}`}</div>
                </Link>
            
        </div>
    );
};
export async function getStaticProps() {
    return {
        props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
    };
}
export default withTranslation('common')(ContactUs);
