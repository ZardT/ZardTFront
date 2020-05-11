import { Carousel } from "antd";
import { LearnMore } from "../index";
import styles from "./Banner.module.css";
const Banner = () => {
  return (
    <div className={styles.banner}>
      <Carousel autoplay={true}>
        <div className={styles.banner_img}>
          <img
            src="https://zardt.oss-cn-beijing.aliyuncs.com/front/banner_1.png"
            alt="banner"
          />
          <div className={styles.banner_content}>
            <LearnMore></LearnMore>
          </div>
        </div>
        <div className={styles.banner_img}>
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
        </div>
      </Carousel>
    </div>
  );
};
export default Banner;
