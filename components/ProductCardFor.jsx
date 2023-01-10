import Image from "next/image";
import styles from "../styles/ProductCardFor.module.css";
import { fNumber } from "../untils/numberFormat";
import Link from "next/link";
import { Card, CardContent, Rating } from "@mui/material";
import { useRouter } from "next/router";


const ProductCardFor = ({ product }) => {
  const img = product.image[0]
  const router = useRouter();

  const handelClick = (id) => {
    router.push(`/product/${id}`)
  }
  return (

    <Card
      onClick={() => { handelClick(product._id) }}
      sx={{ cursor: "pointer" }}>
      <div
        className={styles.container}>
        <div className={styles.image}>
          {/* <Link href={`/product/${product._id}`} passHref> */}
          <Image alt="" src={img} width="500" height="500" />
          {/* </Link> */}
        </div>
        <CardContent sx={{ textAlign: 'center' }}>
          <h1 className={styles.title}>
            {product.title}
          </h1>
          <span className={styles.price}>{fNumber(product.price)} <span>đ</span> /
            <span style={{ color: "#777" }}>{product.unit}</span></span>

          <div style={{ marginTop: "10px", fontSize: '16px' }}>
            <Rating value={product.rating} size="small" />
          </div>
        </CardContent>
      </div>
    </Card>

  );
};

export default ProductCardFor;
