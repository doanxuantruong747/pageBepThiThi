import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            BẾP THI THI MANG ĐẾN CHO QUÍ KHÁCH NHỮNG SẢN PHẨM TƯƠI NHẤT, NGON NHẤT KHI ĐẾN TAY KHÁCH HÀNG
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ĐỊA CHỈ:</h1>
          <p className={styles.text}>
            Số 454, đường Võ Chí Công
            <br /> P.Phú Hữu, TP. Thủ Đức
            <br /> (+84) 939-361-051
          </p>

        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>THỜI GIAN LÀM VIỆC</h1>
          <p className={styles.text}>
            TẤT CẢ CÁC NGÀY TRONG TUẦN
            <br /> 8:00 – 22:00
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;
