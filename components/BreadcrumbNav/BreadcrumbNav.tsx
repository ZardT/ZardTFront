import { FC } from "react";
import { Breadcrumb } from "antd";

import Link from "next/link";
import { WithTranslation } from "next-i18next";
import NextI18NextInstance from "../../i18n.js";
const { withTranslation, i18n } = NextI18NextInstance;

type Props = {
    second: {
        link: string,
        title: string
    };
} & WithTranslation;
const BreadcrumbNav: FC<Props> = ({ t, second }) => {
    return (
        <Breadcrumb separator=">">
            {/* <Breadcrumb.Item href="/ProductCenter">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={second.link}>{second.title}</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item> */}
        </Breadcrumb>
    )
}

export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] },
    };
}
export default withTranslation("common")(BreadcrumbNav);
