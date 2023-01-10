import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import { fNumber } from "../untils/numberFormat";
import Link from "next/link";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const img = product.image[0]
  const router = useRouter();

  const handelClick = (id) => {
    router.push(`/product/${id}`)
  }

  return (
    <div
      className={styles.container}>

      <div className={styles.image}
        onClick={() => handelClick(product._id)}>
        <Image alt="" src={img} width="700" height="700" />
      </div>
      <h1 className={styles.title}>
        {product.title}
      </h1>
      <span className={styles.price}>{fNumber(product.price)} <span>đ</span>/
        <span>{product.unit}</span>
      </span>
      <div className={styles.des}
        maxLength="10">
        {product.describe}
      </div>
      <div className={styles.rating}>
        <Rating value={product.rating} size='small' />
      </div>
    </div>
  );
};

export default ProductCard;
