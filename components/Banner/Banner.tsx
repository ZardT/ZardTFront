import { Carousel } from "antd";
import { LearnMore } from "../index";
import NextI18NextInstance from "../../i18n.js";
import styles from "./Banner.module.css";
const { withTranslation, i18n } = NextI18NextInstance;
const Banner = ({ t }) => {
  return (
    <div className={styles.banner}>
      <Carousel autoplay={true}>
        <div className={styles.banner_img}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/banner_1.png"
            alt="banner"
          />
          <div className={styles.banner_content}>
            <p>{t("以客户")}</p>
            <p>
              {t("为")}<span>{t("核心")}</span>
            </p>
            <LearnMore></LearnMore>
          </div>
        </div>
        {/* <div className={styles.banner_img}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/banner_2.png"
            alt="banner"
          />
          <div className={styles.banner_content}>
            <LearnMore></LearnMore>
          </div>
        </div>
        <div className={styles.banner_img}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/banner_3.png"
            alt="banner"
          />
          <div className={styles.banner_content}>
            <LearnMore></LearnMore>
          </div>
        </div> */}
      </Carousel>
    </div>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ["common"] }, // will be passed to the page component as props
  };
}
export default withTranslation("common")(Banner);
