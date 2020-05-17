import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import PublicContext from '../utils/PublicContext';
import NextI18NextInstance from '../i18n.js';
import 'antd/dist/antd.css';
import '../public/css/public.css';
const { appWithTranslation, i18n } = NextI18NextInstance;

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log(pageProps);
    console.log('test');
  });
  return (
    <>
      <Head>
        <title>首页</title>
        <link rel="icon" href="/dpico.ico" />
        {/* 关键字 */}
        <meta
          name="google-site-verification"
          content="gSXxTnxW1rBANHphR_6p_eSYO0jlMcILStNW_1I8e-o"
        />
        <meta name="baidu-site-verification" content="MULR8i7Lzp" />
        <meta name="keywords" content="ZardT,扎带,线卡,"></meta>
        {/* 描述 */}
        <meta
          name="description"
          content="YUEQING YONGYE IMP&EXP CO.,LTD . ZardT . Main Products: 
                    Self-locking nylon cable ties and other kind of nylon cable ties 
                    , stainless steel cable ties,cable clips,terminal blocks,insulated 
                    terminals,wire joints, cable tie mounts,spiral wrapping bands,wiring 
                    ducts,nylon cable glands,cable tie holder,cable clamps,plastic cross,
                    expand nail,heat-shrinkable tubings,wire connectors.
                    乐清市永烨进出口有限公司。主要产品：自锁式尼龙扎带以及其他类型扎带，不锈钢扎带，
                    钢钉线卡，接线端子，冷压端子，压线帽，吸盘，定位片，缠绕管，线槽，电缆固定头，
                    固定座，R型线夹，塑料十字架，膨胀管，热缩管，连接器。"
        ></meta>
      </Head>
      <ConfigProvider locale={locale}>
        <PublicContext.Provider value={null}></PublicContext.Provider>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
};

export default appWithTranslation(App);
