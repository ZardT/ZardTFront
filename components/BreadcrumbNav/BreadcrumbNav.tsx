import { FC } from "react";
import { Breadcrumb, Row, Col } from "antd";

import Link from "next/link";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";
import styles from "./BreadcrumbNav.module.css"
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
    second: {
        link?: string,
        title: string
    };
    tertius?: {
        link: string,
        title: string
    };

} & WithTranslation;
const BreadcrumbNav: FC<Props> = ({ t, second, tertius }) => {
    return (
        <Row className={styles.breadcrumb_nav}>
            <Col span={24}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item href="/ProductCenter">产品中心</Breadcrumb.Item>
                    {second.link ? <Breadcrumb.Item href={second.link}>{second.title}</Breadcrumb.Item> :
                        <Breadcrumb.Item>{second.title}</Breadcrumb.Item>}
                    {tertius ? <Breadcrumb.Item href={tertius.link}>{tertius.title}</Breadcrumb.Item> : null}
                </Breadcrumb>
            </Col>
        </Row>
    )
}

export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] },
    };
}
export default withTranslation("common")(BreadcrumbNav);
