/**
 * pages模版快速生成脚本,执行命令 npm run temp `文件名`
 */
const fs = require('fs');
const dirName = process.argv[2];
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run temp test');
  process.exit(0);
}
// 页面模版
const indexTep = `import { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import NextI18NextInstance from "../../i18n.js";
import { Header, Banner, Classify, LearnMore, Footer, BreadcrumbNav } from "../../components";
import styles from "public/css/ProductCenter.module.css";
const { i18n, withTranslation } = NextI18NextInstance;



const ${titleCase(dirName)} = () =>{
    return (
        <div className={styles.${titleCase(dirName)}}>
            <Header></Header>
            {/* <BreadcrumbNav second={{ link: "/index", title: "二级分类" }}></BreadcrumbNav> */}
            <Footer contactUs={true} footerAd={false}></Footer>
        </div>
    )
}



export async function getStaticProps() {
    return {
        props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
    };
}
export default withTranslation("common")(${titleCase(dirName)});
`;

// service页面模版
const serviceTep = `import Request from '../../utils/axios';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'get',
    data,
  });
};
`;
fs.mkdirSync(`./pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.tsx', indexTep);
// fs.writeFileSync('index.less', lessTep);
// fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);
function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] =
      array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}
process.exit(0);
