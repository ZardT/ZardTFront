import { Carousel } from "antd";
import styles from "./Banner.module.css";
const Banner = () => {
  return (
    <div className={styles.banner}>
      <Carousel autoplay={true}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Carousel>
    </div>
  );
};
export default Banner;
